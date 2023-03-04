import { ethers } from "hardhat";
import { MyToken__factory } from "../typechain-types";
require("dotenv").config();

const TOKEN_CONTRACT_ADDRESS = "<TO_DO_INSERT_DEPLOYED_TOKEN_CONTRACT";

async function main() {
    // Accept and validate address input - only one address at a time
    const args = process.argv;
    const minter = args.slice(2);
    if (minter.length <= 0) throw new Error("Missing minter addresses");
    if (minter.length > 1) throw new Error("Will only grant minter role one address at a time");
    if(!ethers.utils.isAddress(minter[0])) throw new Error(`Invalid minter address: ${minter[0]}`);

    const provider = new ethers.providers.AlchemyProvider("goerli", process.env.ALCHEMY_API_KEY);

    const privateKey = process.env.PRIVATE_KEY;
    if (!privateKey || privateKey.length <= 0) throw new Error("Missing environment: Mnemonic seed");
    const wallet = new ethers.Wallet(privateKey);
    console.log(`Connected to the wallet address ${wallet.address}`);

    const signer = wallet.connect(provider);

    // 1: Attach Contract
    const tokenCF = new MyToken__factory(signer);
    console.log("Attaching to contract ...");
    const tokenC = tokenCF.attach(TOKEN_CONTRACT_ADDRESS);
    console.log(`Attached to MyToken contract at ${tokenC.address}`);

    // 2: Grant minting roles
    console.log(`Granting minting role to ${minter[0]}`);
    let TxReceipt = await tokenC.addMinter(minter[0]);
    console.log({ TxReceipt });
    console.log("Minting role granted");
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
