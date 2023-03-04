import {ethers} from 'hardhat';
import {Ballot__factory} from '../typechain-types';
require('dotenv').config();

const TOKEN_CONTRACT_ADDRESS = '<TO_DO_INSERT_DEPLOYED_TOKEN_CONTRACT';

async function main() {
    // prepare signer
    const privateKey = process.env.PRIVATE_KEY;
    if (!privateKey || privateKey.length <= 0) throw new Error('Missing environment: privte wallet key');
    const wallet = new ethers.Wallet(privateKey);
    const provider = new ethers.providers.InfuraProvider('goerli', process.env.INFURA_API_KEY);
    const signer = wallet.connect(provider);
    console.log(`Prepared signer with wallet address: ${signer.address}`);

    // attach contract
    const ballotContractFactory = new Ballot__factory(signer);
    const ballotContract = ballotContractFactory.attach(TOKEN_CONTRACT_ADDRESS);
    console.log(`Attached to Ballot contract at: ${TOKEN_CONTRACT_ADDRESS}`);

    // query the results
    const winnerNameBytes = await ballotContract.winnerName();
    const winnerNameString = ethers.utils.parseBytes32String(winnerNameBytes);
    console.log(`Winner is: ${winnerNameString}`);
}

main().catch(err => {
    console.log(err);
    process.exitCode = 1;
});
