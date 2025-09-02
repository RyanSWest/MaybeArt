// testMintNFTAuto.ts
import { Connection, Keypair, clusterApiUrl } from "@solana/web3.js";
import { Metaplex, keypairIdentity } from "@metaplex-foundation/js";
import fetch, { FormData, Blob } from "node-fetch";
import fs from "fs";
import os from "os";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

// ------------------- CONFIG ------------------- //
const PINATA_JWT = process.env.VITE_PINATA_JWT;

// Default Solana CLI wallet location
const DEFAULT_WALLET_PATH = path.join(os.homedir(), ".config", "solana", "id.json");

// NFT metadata
const nftMetadata = {
  name: "Giant Green Tiger",
  description: "Tiger fights the horde of zombies throwing them like ragdolls",
  image: "https://images.nightcafe.studio/ik-seo/jobs/rI1iRPyMVDij7xejVJVR/rI1iRPyMVDij7xejVJVR--1--k54o1/giant-green-tiger.jpg",
  attributes: [
    { trait_type: "Type", value: "AI Art" },
    { trait_type: "Theme", value: "Tiger vs Zombies" }
  ]
};
// --------------------------------------------- //

// Load wallet from default path
if (!fs.existsSync(DEFAULT_WALLET_PATH)) {
  console.error(`Wallet not found at ${DEFAULT_WALLET_PATH}`);
  process.exit(1);
}
const walletData = JSON.parse(fs.readFileSync(DEFAULT_WALLET_PATH, "utf8"));
const wallet = Keypair.fromSecretKey(Uint8Array.from(walletData));

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// ------------------- FUNCTIONS ------------------- //

async function uploadToPinata(metadata: any) {
  const formData = new FormData();
  const blob = new Blob([JSON.stringify(metadata)], { type: "application/json" });
  formData.append("file", blob, "metadata.json");

  const res = await fetch("https://uploads.pinata.cloud/v3/files", {
    method: "POST",
    headers: { Authorization: `Bearer ${PINATA_JWT}` },
    body: formData,
  });

  const result = await res.json();
  if (!result.IpfsHash) throw new Error("Pinata upload failed");
  return `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;
}

async function mintNFT(metadataUri: string) {
  const metaplex = Metaplex.make(connection).use(keypairIdentity(wallet));
  const { nft } = await metaplex.nfts().create({
    uri: metadataUri,
    name: nftMetadata.name,
    sellerFeeBasisPoints: 500,
  });
  return nft.address.toBase58();
}

// ------------------- MAIN ------------------- //

async function main() {
  console.log("Uploading metadata to Pinata...");
  const metadataUri = await uploadToPinata(nftMetadata);
  console.log("Metadata URI:", metadataUri);

  console.log("Minting NFT...");
  const mintAddress = await mintNFT(metadataUri);
  console.log("NFT Minted:", mintAddress);
}

main().catch(console.error);
