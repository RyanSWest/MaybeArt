import { Connection, PublicKey } from '@solana/web3.js';
import { Metaplex } from '@metaplex-foundation/js';
import {useState} from 'react'
 const tokenAccountAddress = 'AKtsoqyKNjL5BhfcZwfuGESC4N88GZKQDm25Aaje9WJ7';

const connection = new Connection('https://api.devnet-beta.solana.com');


async function getMintAddress(tokenAccountAddress) {
    const tokenAccountInfo = await connection.getParsedAccountInfo(new PublicKey(tokenAccountAddress));
    return tokenAccountInfo.value.data.parsed.info.mint;
}

// Example usage
// const tokenAccountAddress = 'YourTokenAccountAddressHere';
getMintAddress(tokenAccountAddress).then(mintAddress => {
    console.log('Mint Address:', mintAddress);
});