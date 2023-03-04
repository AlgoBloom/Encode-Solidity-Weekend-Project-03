import { MyToken, MyToken__factory } from "../typechain-types";
import { ethers } from "hardhat";

const MINT_VALUE = ethers.utils.parseEther("10");

async function main () {
    const [deployer, account1, account2] = await ethers.getSigners();
    // Deploy the contract
    const contractFactory = new MyToken__factory(deployer);
    const contract: MyToken = await contractFactory.deploy();
    const deployTransactionReceipt = await contract.deployTransaction.wait();
    console.log(`The Tokenized Vote Contract was deployed at the block ${deployTransactionReceipt.blockNumber}`);
    // Mint some tokens
    const mintTx = await contract.mint(account1.address, MINT_VALUE);
    const mintTxReceipt = await mintTx.wait();
    console.log(`Tokens minted for ${account1.address} at block ${mintTxReceipt.blockNumber}`);
    const tokenBalanceAccount1 = await contract.balanceOf(account1.address);
    console.log(`Account 1 has a balance of ${ethers.utils.formatEther(tokenBalanceAccount1)} Vote Tokens`);
    // Check voting power for the first time, before delegation
    let votePowerAccount1 = await contract.getVotes(account1.address);
    console.log(`Account 1 has a vote power of ${ethers.utils.formatEther(votePowerAccount1)} units`);
    // Self delegate to create checkpoint and grant voting power (delegates everything we have)
    const delegateTx = await contract.delegate(account1.address);
    const delegateTxReceipt = await delegateTx.wait();
    console.log(`Tokens delegated for ${account1.address} at block ${delegateTxReceipt.blockNumber}`);
    // Check voting power for the second time, after delegation
    votePowerAccount1 = await contract.getVotes(account1.address);
    console.log(`Account 1 has a vote power of ${ethers.utils.formatEther(votePowerAccount1)} units`);

}

main().catch((error) => {
    console.log(error);
    process.exitCode = 1;
});