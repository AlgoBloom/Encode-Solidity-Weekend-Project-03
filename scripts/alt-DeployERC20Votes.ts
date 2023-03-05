import { ethers } from "ethers";
import { MyToken, MyToken__factory } from "../typechain-types";
require("dotenv").config();


async function main() {
  let myTokenC: MyToken;

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

  // Deploy MyToken contract
  console.log("Deploying contract ...");
  const myTokenCF = new MyToken__factory(signer);
  myTokenC = await myTokenCF.deploy();
  const myTokenCTxReceipt = await myTokenC.deployTransaction.wait();
  
  console.log({ myTokenCTxReceipt });

  console.log(
    `The My Token contract was deployed at the address: ${myTokenC.address}`
  );
}

main().catch((error) => {
  console.log(error);
  process.exitCode = 1;
});
