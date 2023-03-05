// WORK IN PROGRESS //

import { MyToken, MyToken__factory } from "../typechain-types";
import { ethers, Wallet } from 'ethers';
import * as dotenv from 'dotenv';
import { token } from "../typechain-types/@openzeppelin/contracts";
dotenv.config();

const MINT_VALUE = ethers.utils.parseEther("10");

const TOKEN_CONTRACT_ADDRESS = "0x62e1B19944b55022988F94687c1097fCe1F23a1d";

async function main () {
    
    // gets the goerli provider
    const provider = ethers.getDefaultProvider("goerli");

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


                    // 4. DELEGATE TOKENS FOR VOTING POWER

    // Check voting power for Joshua before delegation
    let votingPowerJoshua = await tokenContract.getVotes(walletJoshua.address);
    console.log(`Joshua has a vote power of ${ethers.utils.formatEther(votingPowerJoshua)} units`);
    // Check voting power for Hardeep before delegation
    let votingPowerHardeep = await tokenContract.getVotes(walletJoshua.address);
    console.log(`Hardeep has a vote power of ${ethers.utils.formatEther(votingPowerHardeep)} units`);
    // Check voting power for Chris before delegation
    // Check voting power for Lindsay before delegation
    // Check voting power for Owen before delegation
    // Check voting power for Josh before delegation

    // Self delegate for Joshua to create checkpoint and grant voting power (delegates everything we have)
    const delegateTxJoshua = await tokenContract.connect(walletJoshua).delegate(walletJoshua.address);
    const delegateTxReceiptJoshua = await delegateTxJoshua.wait();
    console.log(`Tokens delegated for ${walletJoshua.address} at block: ${delegateTxReceiptJoshua.blockNumber}`);
    // Self delegate for Hardeep to create checkpoint and grant voting power (delegates everything we have)
    const delegateTxHardeep = await tokenContract.connect(walletHardeep).delegate(walletHardeep.address);
    const delegateTxReceiptHardeep = await delegateTxHardeep.wait();
    console.log(`Tokens delegated for ${walletHardeep.address} at block: ${delegateTxReceiptHardeep.blockNumber}`);
    // Self delegate for Chris to create checkpoint and grant voting power (delegates everything we have)
    // Self delegate for Lindsay to create checkpoint and grant voting power (delegates everything we have)
    // Self delegate for Owen to create checkpoint and grant voting power (delegates everything we have)
    // Self delegate for Josh to create checkpoint and grant voting power (delegates everything we have)


    // Check voting power for Joshua before delegation
    votingPowerJoshua = await tokenContract.getVotes(walletJoshua.address);
    console.log(`Joshua has a vote power of ${ethers.utils.formatEther(votingPowerJoshua)} units`);
    // Check voting power for Hardeep before delegation
    votingPowerHardeep = await tokenContract.getVotes(walletJoshua.address);
    console.log(`Hardeep has a vote power of ${ethers.utils.formatEther(votingPowerHardeep)} units`);
    // Check voting power for Chris after delegation
    // Check voting power for Lindsay after delegation
    // Check voting power for Owen after delegation
    // Check voting power for Josh after delegation

}

main().catch((error) => {
    console.log(error);
    process.exitCode = 1;
});

///

// import { ethers, Wallet } from 'ethers';
// import * as dotenv from 'dotenv';
// import { Ballot__factory } from '../typechain-types';
// dotenv.config();

// function convertStringArrayToBytes32(array: string[]) {
//   const bytes32Array = [];
//   for (let index = 0; index < array.length; index++) {
//       bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
//   }
//   return bytes32Array;
// }

// async function main () {
//   const args = process.argv;
//   const proposals = args.slice(2);
//   if (proposals.length <= 0) throw new Error("Missing parameters: proposals");

//   const provider = ethers.getDefaultProvider("goerli");
//   const mnemonic = process.env.MNEMONIC;
//   if(!mnemonic || mnemonic.length <= 0) throw new Error("Missing environment: mnemonic seed");
//   const wallet = ethers.Wallet.fromMnemonic(mnemonic);
//   console.log(`Connected to the wallet address ${wallet.address}`);

//   const signer = wallet.connect(provider);
//   const balance = await signer.getBalance();
//   console.log(`Wallet balance: ${balance} Wei`);

//   console.log("Deploying Ballot contract!");
//   console.log("Proposals: ");
//   proposals.forEach((element, index) => {
//     console.log(`Proposal N. ${index + 1}: ${element}`);
//   });
//   const ballotContractFactory = new Ballot__factory(signer);
//   console.log("Deploying contract ...");

//   const ballotContract = await ballotContractFactory.deploy(
//       convertStringArrayToBytes32(proposals)
//   );
//   const deployTxReceipt = await ballotContract.deployTransaction.wait();
//   console.log(`The Ballot contract was deployed at the address ${ballotContract.address}`);
//   console.log({deployTxReceipt});
// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });