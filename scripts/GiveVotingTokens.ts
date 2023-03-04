import { ethers } from "hardhat";

async function main () {
    // accounts to test with from local environment
    const [deployer, account1, account2] = await ethers.getSigners();

}

main().catch((error) => {
    console.log(error);
    process.exitCode = 1;
});