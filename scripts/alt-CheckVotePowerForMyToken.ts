import { ethers } from "ethers";
import { MyToken, MyToken__factory } from "../typechain-types";
require("dotenv").config();

const TOKEN_CONTRACT_ADDRESS = "0x86C017083ee00e44cDf707DC6272f115d2e7b2fe";
const MINT_VALUE = ethers.utils.parseEther("10");

async function main() {
  let myTokenC: MyToken;
  let addresses: string[] = [];

  const args = process.argv;
  const argValues = args.slice(2);

  // Check arguments
  if (argValues.length <= 0) throw new Error("Missing address");
  // getAddress will throw error if address is invalid
  argValues.forEach((arg, index) => {
    // console.log(`Address ${index + 1}: ${arg}`);
    addresses.push(ethers.utils.getAddress(arg));
  });

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

  // Attach instance of contract factory to a deployed contract address
  const myTokenCF = new MyToken__factory(signer);
  console.log("Attaching to contract ...");
  myTokenC = myTokenCF.attach(TOKEN_CONTRACT_ADDRESS);

  // Check token balance and voting power for each address arguments
  await Promise.all(addresses.map(async (address) => {
    const tokenBalance = await myTokenC.balanceOf(address);
    const votingPower = await myTokenC.getVotes(address);
    console.log(
      `Address: ${address} - Token balance: ${ethers.utils.formatEther(
        tokenBalance
      )}, Voting Power: ${ethers.utils.formatEther(votingPower)}`
    );
  }));
}

main().catch((error) => {
  console.log(error);
  process.exitCode = 1;
});
