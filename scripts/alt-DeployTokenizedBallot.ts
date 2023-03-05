import { ethers } from "ethers";
import {
  Ballot,
  Ballot__factory,
} from "../typechain-types";
require("dotenv").config();

const TARGET_BLOCK_NUMBER = Number("8598989");
const TOKEN_CONTRACT_ADDRESS = "0x86C017083ee00e44cDf707DC6272f115d2e7b2fe";
const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];

function convertStringArrayToBytes32(array: string[]) {
  const bytes32Array = [];
  for (let index = 0; index < array.length; index++) {
    bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
  }
  return bytes32Array;
}

async function main() {
  let tokenizedBallotC: Ballot;

  // Setup provider
  // const provider = ethers.provider;
  // const provider = ethers.getDefaultProvider("goerli");
  //   const provider = new ethers.providers.InfuraProvider("goerli", process.env.INFURA_API_KEY);
  const provider = new ethers.providers.AlchemyProvider(
    "goerli",
    process.env.ALCHEMY_API_KEY
  );

  // Setup Wallet
  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey || privateKey.length <= 0)
    throw new Error("Missing environment: Private Key");
  const wallet = new ethers.Wallet(privateKey);
  console.log(`Connected to the wallet address: ${wallet.address}`);

  // Connect wallet to a provider
  const signer = wallet.connect(provider);

  // Check wallet balance
  const balance = await signer.getBalance();
  console.log(
    `Wallet balance: ${balance} Wei, ${ethers.utils.formatEther(balance)} ETH`
  );

  // Deploy Tokenized Ballot contract
  console.log("Deploying contract ...");

  const tokenizedBallotCF = await new Ballot__factory(signer);
  tokenizedBallotC = await tokenizedBallotCF.deploy(
    convertStringArrayToBytes32(PROPOSALS),
    TOKEN_CONTRACT_ADDRESS,
    TARGET_BLOCK_NUMBER
  );
  const tokenizedBallotCTx = await tokenizedBallotC.deployTransaction.wait();
  
  console.log({ tokenizedBallotCTx });
  console.log(
    `The Tokenized ballot contract was deployed at the address: ${tokenizedBallotC.address}`
  );
}

main().catch((error) => {
  console.log(error);
  process.exitCode = 1;
});
