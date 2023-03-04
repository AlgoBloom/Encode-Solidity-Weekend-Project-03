import { MyToken__factory } from "../typechain-types";
import { ethers } from "hardhat";

const MINT_VALUE = ethers.utils.parseEther("10");

async function main () {
    const [deployer, account1, account2] = await ethers.getSigners();
    // Deploy the contract
    const contractFactory = new MyToken__factory(deployer);
    const contract = await contractFactory.deploy();
    const deployTransactionReceipt = await contract.deployTransaction.wait();
    console.log(`The Tokenized Vote Contract was deployed at the block ${deployTransactionReceipt.blockNumber}`);
    // Mint some tokens
    const mintTx = await contract.mint(account1.address, MINT_VALUE)
    const mintTxReceipt = await mintTx.wait();
    console.log(`Tokens minted for ${account1.address} at block ${mintTxReceipt.blockNumber}`);

    // Check voting power
}

main().catch((error) => {
    console.log(error);
    process.exitCode = 1;
});