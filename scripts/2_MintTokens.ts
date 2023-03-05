import { ethers } from "hardhat";
import { MyToken__factory } from "../typechain-types";
require("dotenv").config();

const TOKEN_CONTRACT_ADDRESS = "0x62e1B19944b55022988F94687c1097fCe1F23a1d";

const MINT_VALUE = ethers.utils.parseEther("10");

async function main() {

    const provider = new ethers.providers.AlchemyProvider("goerli", process.env.ALCHEMY_API_KEY);

    // 1. CONNECT ALL TEAM 4 TEST WALLETS

    // instantiate wallet for Joshua
    const Joshua_Pk = process.env.PRIVATE_KEY_JOSHUA;
    if(!Joshua_Pk || Joshua_Pk.length <= 0) throw new Error("Missing environment: private key for Joshua");
    const walletJoshua = new ethers.Wallet(Joshua_Pk);
    console.log(`Connected to Joshua's wallet address: ${walletJoshua.address}`);
    // instantiate wallet for Hardeep
    const Hardeep_Pk = process.env.PRIVATE_KEY_HARDEEP;
    if(!Hardeep_Pk || Hardeep_Pk.length <= 0) throw new Error("Missing environment: private key for Hardeep");
    const walletHardeep = new ethers.Wallet(Joshua_Pk);
    console.log(`Connected to Hardeep's wallet address: ${walletHardeep.address}`);
    // instantiate wallet for Chris
    const Chris_Pk = process.env.PRIVATE_KEY_CHRIS;
    if(!Chris_Pk || Hardeep_Pk.length <= 0) throw new Error("Missing environment: private key for Chris");
    const walletChris = new ethers.Wallet(Chris_Pk);
    console.log(`Connected to Chris' wallet address: ${walletChris.address}`);
    // instantiate wallet for Lindsay
    const Lindsay_Pk = process.env.PRIVATE_KEY_LINDSAY;
    if(!Lindsay_Pk || Hardeep_Pk.length <= 0) throw new Error("Missing environment: private key for Lindsay");
    const walletLindsay = new ethers.Wallet(Lindsay_Pk);
    console.log(`Connected to Lindsay's wallet address: ${walletLindsay.address}`);
    // instantiate wallet for Owen
    const Owen_Pk = process.env.PRIVATE_KEY_OWEN;
    if(!Owen_Pk || Owen_Pk.length <= 0) throw new Error("Missing environment: private key for Owen");
    const walletOwen = new ethers.Wallet(Owen_Pk);
    console.log(`Connected to Owen's wallet address: ${walletOwen.address}`);
    // instantiate wallet for Josh
    const Josh_Pk = process.env.PRIVATE_KEY_JOSH;
    if(!Josh_Pk || Josh_Pk.length <= 0) throw new Error("Missing environment: private key for Josh");
    const walletJosh = new ethers.Wallet(Owen_Pk);
    console.log(`Connected to Josh's wallet address: ${walletJosh.address}`);
                    
    // 2. CREATE SIGNERS FROM WALLET

    const signerJoshua = walletJoshua.connect(provider);
    const signerHardeep = walletHardeep.connect(provider);
    const signerChris = walletChris.connect(provider);
    const signerLindsay = walletLindsay.connect(provider);
    const signerOwen = walletOwen.connect(provider);
    const signerJosh = walletJosh.connect(provider);

    // 3. ATTACH CONTRACT
    // Joshua attaches to the contract and instantiates it
    const tokenContractFactory = new MyToken__factory(signerJoshua);
    console.log("Attaching to contract ...");
    const tokenContract = tokenContractFactory.attach(TOKEN_CONTRACT_ADDRESS);
    console.log(`Attached to MyToken contract at ${tokenContract.address}`);

    // 4. MINTING TOKENS
    console.log(`Minting tokens for ${signerJoshua.address}`);
    let mintTx = await tokenContract.mint(signerJoshua.address, MINT_VALUE);
    let mintTxReceipt = await mintTx.wait();
    console.log(`Minted tokens for ${signerJoshua.address} at block ${mintTxReceipt.blockNumber}`);
    let tokenBalanceAccount = await tokenContract.balanceOf(signerJoshua.address);
    console.log(`Address ${signerJoshua.address} has a balance of ${ethers.utils.formatEther(tokenBalanceAccount)}\n`);
    
    console.log(`Minting tokens for ${signerHardeep.address}`);
    mintTx = await tokenContract.mint(signerHardeep.address, MINT_VALUE);
    mintTxReceipt = await mintTx.wait();
    console.log(`Minted tokens for ${signerHardeep.address} at block ${mintTxReceipt.blockNumber}`);
    tokenBalanceAccount = await tokenContract.balanceOf(signerHardeep.address);
    console.log(`Address ${signerHardeep.address} has a balance of ${ethers.utils.formatEther(tokenBalanceAccount)}\n`);

    console.log(`Minting tokens for ${signerChris.address}`);
    mintTx = await tokenContract.mint(signerChris.address, MINT_VALUE);
    mintTxReceipt = await mintTx.wait();
    console.log(`Minted tokens for ${signerChris.address} at block ${mintTxReceipt.blockNumber}`);
    tokenBalanceAccount = await tokenContract.balanceOf(signerChris.address);
    console.log(`Address ${signerChris.address} has a balance of ${ethers.utils.formatEther(tokenBalanceAccount)}\n`);

    console.log(`Minting tokens for ${signerLindsay.address}`);
    mintTx = await tokenContract.mint(signerLindsay.address, MINT_VALUE)
    mintTxReceipt = await mintTx.wait();
    console.log(`Minted tokens for ${signerLindsay.address} at block ${mintTxReceipt.blockNumber}`);
    tokenBalanceAccount = await tokenContract.balanceOf(signerLindsay.address);
    console.log(`Address ${signerLindsay.address} has a balance of ${ethers.utils.formatEther(tokenBalanceAccount)}\n`);

    console.log(`Minting tokens for ${signerOwen.address}`);
    mintTx = await tokenContract.mint(signerOwen.address, MINT_VALUE);
    mintTxReceipt = await mintTx.wait();
    console.log(`Minted tokens for ${signerOwen.address} at block ${mintTxReceipt.blockNumber}`);
    tokenBalanceAccount = await tokenContract.balanceOf(signerOwen.address);
    console.log(`Address ${signerOwen.address} has a balance of ${ethers.utils.formatEther(tokenBalanceAccount)}\n`);

    console.log(`Minting tokens for ${signerJosh.address}`);
    mintTx = await tokenContract.mint(signerJosh.address, MINT_VALUE);
    mintTxReceipt = await mintTx.wait();
    console.log(`Minted tokens for ${signerJosh.address} at block ${mintTxReceipt.blockNumber}`);
    tokenBalanceAccount = await tokenContract.balanceOf(signerJosh.address);
    console.log(`Address ${signerJosh.address} has a balance of ${ethers.utils.formatEther(tokenBalanceAccount)}\n`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
