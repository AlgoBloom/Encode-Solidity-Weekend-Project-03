import { ethers } from "ethers";
import { Ballot, Ballot__factory } from "../typechain-types";
require("dotenv").config();

const BALLOT_CONTRACT_ADDRESS = "0xD1B95B52f0818834d8a52Df183D1d1Fa0DA75591";

async function main() {
  let tokenizedBallotC: Ballot;
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
  const tokenizedBallotCF = new Ballot__factory(signer);
  console.log("Attaching to contract ...");
  tokenizedBallotC = tokenizedBallotCF.attach(BALLOT_CONTRACT_ADDRESS);

  // Check target block number
  const targetBlockNumber = await tokenizedBallotC.targetBlockNumber();
  console.log(`Target Block Number: ${targetBlockNumber}`);

  // Check token balance and voting power for each address arguments
  await Promise.all(
    addresses.map(async (address) => {
      const votingPower = await tokenizedBallotC.votingPower(address);
      console.log(
        `Address: ${address} - Voting Power: ${ethers.utils.formatEther(
          votingPower
        )}`
      );
    })
  );
}

main().catch((error) => {
  console.log(error);
  process.exitCode = 1;
});
