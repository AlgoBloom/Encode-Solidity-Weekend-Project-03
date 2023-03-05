import { ethers } from "ethers";
import { MyToken, MyToken__factory } from "../typechain-types";
require("dotenv").config();

const TOKEN_CONTRACT_ADDRESS = "0x86C017083ee00e44cDf707DC6272f115d2e7b2fe";
const MINT_VALUE = ethers.utils.parseEther("10");

async function main() {
  let myTokenC: MyToken;

  const args = process.argv;
  const argValues = args.slice(2);

  // Check arguments
  if (argValues.length <= 0) throw new Error("Missing address");
  if (argValues.length > 2)
    throw new Error("Provide only an address and an amount");

  argValues.forEach((arg, index) => {
    console.log(`Argument ${index + 1}: ${arg}`);
  });

  // getAddress will throw error if address is invalid
  const addressTo = ethers.utils.getAddress(argValues[0]);
  const transferAmount = ethers.utils.parseEther(argValues[1]);

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
  
  // Check to ensure signer is not transferring to self
  if(signer.address == addressTo) throw new Error(`Enter a valid address, can't transfer to self.`);

  // Check wallet balance
  const balance = await signer.getBalance();
  console.log(
    `Wallet balance: ${balance} Wei, ${ethers.utils.formatEther(balance)} ETH`
  );

  // Attach instance of contract factory to a deployed contract address
  const myTokenCF = new MyToken__factory(signer);
  console.log("Attaching to contract ...");
  myTokenC = myTokenCF.attach(TOKEN_CONTRACT_ADDRESS);

  // Transfer Tokens
  console.log("Transferring Tokens ...");
  const transferTx = await myTokenC.transfer(addressTo, transferAmount);
  transferTx.wait().then(async (receiptTx) => {
    console.log({ receiptTx });
    console.log('Token transfer complete!')

    // Check voting power of singer
    const tokenBalanceSigner = await myTokenC.balanceOf(signer.address);
    const votingPowerSigner = await myTokenC.getVotes(signer.address);
    console.log(
      `Address: ${signer.address} - Token balance: ${ethers.utils.formatEther(
        tokenBalanceSigner
      )}, Voting Power: ${ethers.utils.formatEther(votingPowerSigner)}`
    );

    // Check voting power of singer
    const tokenBalanceAcctTo = await myTokenC.balanceOf(addressTo);
    const votingPowerAcctTo = await myTokenC.getVotes(addressTo);
    console.log(
      `Address: ${addressTo} - Token balance: ${ethers.utils.formatEther(
        tokenBalanceAcctTo
      )}, Voting Power: ${ethers.utils.formatEther(votingPowerAcctTo)}`
    );
  });
}

main().catch((error) => {
  console.log(error);
  process.exitCode = 1;
});
