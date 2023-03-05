import { MyToken, MyToken__factory, Ballot__factory } from "../typechain-types";
import { ethers, Wallet } from 'ethers';
import * as dotenv from 'dotenv';
dotenv.config();

const MINT_VALUE = ethers.utils.parseEther("10");

function convertStringArrayToBytes32(array: string[]) {
    const bytes32Array = [];
    for (let index = 0; index < array.length; index++) {
        bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
    }

    return bytes32Array;
  }

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

                    // 3. DEPLOY TOKEN CONTRACT

    const contractFactory = new MyToken__factory(signerJoshua);
    const contract: MyToken = await contractFactory.deploy();
    const deployTransactionReceipt = await contract.deployTransaction.wait();
    console.log(`The Tokenized Vote Contract was deployed at the block ${deployTransactionReceipt.blockNumber}`);

    return;

    //                 // 1. GIVE VOTING TOKENS

    // // Mint some tokens for account 1
    // const mintTx1 = await contract.mint(account1.address, MINT_VALUE);
    // const mintTxReceipt1 = await mintTx1.wait();
    // console.log(`Tokens minted for ${account1.address} at block ${mintTxReceipt1.blockNumber}`);
    // let tokenBalanceAccount1 = await contract.balanceOf(account1.address);
    // console.log(`Account 1 has a balance of ${ethers.utils.formatEther(tokenBalanceAccount1)} Vote Tokens`);

    // // Mint some tokens for account 2
    // const mintTx2 = await contract.mint(account2.address, MINT_VALUE);
    // const mintTxReceipt2 = await mintTx2.wait();
    // console.log(`Tokens minted for ${account2.address} at block ${mintTxReceipt2.blockNumber}`);
    // let tokenBalanceAccount2 = await contract.balanceOf(account2.address);
    // console.log(`Account 2 has a balance of ${ethers.utils.formatEther(tokenBalanceAccount2)} Vote Tokens`);

    // // Check voting power of account 1 for the first time, before delegation
    // let votePowerAccount1 = await contract.getVotes(account1.address);
    // console.log(`Account 1 has a vote power of ${ethers.utils.formatEther(votePowerAccount1)} units`);

    // // Check voting power of account 2 for the first time, before delegation
    // let votePowerAccount2 = await contract.getVotes(account1.address);
    // console.log(`Account 1 has a vote power of ${ethers.utils.formatEther(votePowerAccount1)} units`);

    //                 // 2. DELEGATING VOTING POWER

    // // Self delegate for account 1 to create checkpoint and grant voting power (delegates everything we have)
    // const delegateTx1 = await contract.connect(account1).delegate(account1.address);
    // const delegateTxReceipt1 = await delegateTx1.wait();
    // console.log(`Tokens delegated from ${account1.address} for ${account1.address} at block ${delegateTxReceipt1.blockNumber}, cost of ${delegateTxReceipt1.gasUsed} gas units, totalling a transaction cost of ${delegateTxReceipt1.gasUsed.mul(delegateTxReceipt1.effectiveGasPrice)} Wei (${ethers.utils.formatEther(delegateTxReceipt1.gasUsed.mul(delegateTxReceipt1.effectiveGasPrice))} ETH)`);

    // // Self delegate for account 2 to create checkpoint and grant voting power (delegates everything we have)
    // const delegateTx2 = await contract.connect(account2).delegate(account2.address);
    // const delegateTxReceipt2 = await delegateTx2.wait();
    // console.log(`Tokens delegated from ${account2.address} for ${account2.address} at block ${delegateTxReceipt2.blockNumber}, cost of ${delegateTxReceipt2.gasUsed} gas units, totalling a transaction cost of ${delegateTxReceipt2.gasUsed.mul(delegateTxReceipt2.effectiveGasPrice)} Wei (${ethers.utils.formatEther(delegateTxReceipt2.gasUsed.mul(delegateTxReceipt2.effectiveGasPrice))} ETH)`);

    // // Check voting power for account 1 after delegation
    // votePowerAccount1 = await contract.getVotes(account1.address);
    // console.log(`Account 1 has a vote power of ${ethers.utils.formatEther(votePowerAccount1)} units`);

    // // Check voting power for account 2 after delegation
    // votePowerAccount2 = await contract.getVotes(account1.address);
    // console.log(`Account 1 has a vote power of ${ethers.utils.formatEther(votePowerAccount1)} units`);

    // // Transfer Tokens from account 1 to 2
    // const transferTx = await contract.connect(account1).transfer(account2.address, MINT_VALUE.div(2));
    // const transferTxReceipt = await transferTx.wait();
    // console.log(`Tokens transferred from ${account1.address} for ${account2.address} at block ${transferTxReceipt.blockNumber}`);

    // // Check voting power for account 1 after transfer
    // votePowerAccount1 = await contract.getVotes(account1.address);
    // console.log(`Account 1 has a vote power of ${ethers.utils.formatEther(votePowerAccount1)} units`);

    // // Check voting power for account 2 after transfer
    // votePowerAccount2 = await contract.getVotes(account1.address);
    // console.log(`Account 1 has a vote power of ${ethers.utils.formatEther(votePowerAccount1)} units`);

    // // What block am I at?
    // const currentBlock = await ethers.provider.getBlock("latest");
    // console.log(`The current block number is ${currentBlock.number}`)

    // // Check the historical voting power
    // votePowerAccount1 = await contract.getPastVotes(account1.address, currentBlock.number - 1);
    // console.log(`Account 1 had a vote power of ${ethers.utils.formatEther(votePowerAccount1)} units at block ${currentBlock.number - 1}`);
    // votePowerAccount1 = await contract.getPastVotes(account1.address, currentBlock.number - 2);
    // console.log(`Account 2 had a vote power of ${ethers.utils.formatEther(votePowerAccount1)} units at block ${currentBlock.number - 2}`);

    // // accepts arguments from the command line
    // const args = process.argv;
    // const proposals = args.slice(2);
    // if (proposals.length <= 0) throw new Error("Missing parameters: proposals");

    // // deploy the ballot contract
    // console.log("Deploying Ballot contract!");
    // console.log("Proposals: ");
    // proposals.forEach((element, index) => {
    //     console.log(`Proposal N. ${index + 1}: ${element}`);
    // });
    // const ballotContractFactory = new Ballot__factory(deployer);
    // console.log("Deploying contract ...");
    // const ballotContract = await ballotContractFactory.deploy(convertStringArrayToBytes32(proposals), contract.address, delegateTxReceipt2.blockNumber);
    // const deployTxReceipt = await ballotContract.deployTransaction.wait();
    // console.log(`The Ballot contract was deployed at the address ${ballotContract.address}`);

    //                 // 3. CASTING VOTES

    // // account1 casts one vote for strawberry, the 0 indexed arg
    // console.log("Account 1 votes twice for strawberry")
    // const voteTx1 = await ballotContract.connect(account1).vote(0, ethers.utils.parseEther("2"));

    // // account1 casts one vote for chocolate, the 2 indexed arg
    // console.log("Account 1 votes once for chocolate")
    // const voteTx2 = await ballotContract.connect(account1).vote(2, ethers.utils.parseEther("1"));

    // // account2 casts five votes for caramel, the 1 indexed arg
    // console.log("Account 2 votes five times for caramel")
    // const voteTx3 = await ballotContract.connect(account2).vote(1, ethers.utils.parseEther("5"));

    //                 // 4. CHECKING VOTE POWER

    // // checks voting power spent for account 1
    // let votingPowerRemainingAcct1 = await ballotContract.connect(account1).votingPower(account1.address);
    // console.log(`account1 has a remaining voting power of ${votingPowerRemainingAcct1}`)

    // // checks voting power spent for account 2
    // let votingPowerRemainingAcct2 = await ballotContract.connect(account1).votingPower(account2.address);
    // console.log(`account1 has a remaining voting power of ${votingPowerRemainingAcct2}`)

    //                 // 5. QUERYING RESULTS

    // // checks the winner
    // const winner = await ballotContract.winnerName();
    // const winnerFormatted = ethers.utils.parseBytes32String(winner);
    // console.log(`The winner is ${winnerFormatted}!`)
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