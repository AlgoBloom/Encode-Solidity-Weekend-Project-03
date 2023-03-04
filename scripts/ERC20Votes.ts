import { MyToken__factory } from "../typechain-types";
import { ethers } from "hardhat";

async function main () {
    const [deployer, account1, account2] = await ethers.getSigners();
    const contractFactory = new MyToken__factory;
    // Deploy the contrat
    // Mint some tokens
    // Check voting power
}

main().catch((error) => {
    console.log(error);
    process.exitCode = 1;
});