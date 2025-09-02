const connectWallet = async () => {
  const provider = window.solana;
  if (!provider || !provider.isPhantom) {
    alert("Install Phantom to continue");
    return;
  }
  await provider.connect();
  return provider;
};

import { Metaplex } from "@metaplex-foundation/js";
import { browserWallet } from "@metaplex-foundation/js";

// Assume `connection` is already defined:
const metaplex = Metaplex.make(connection).use(browserWallet(provider));

const { nft } = await metaplex.nfts().create({
  uri: metadataUri,          // from Pinata upload
  name: "Giant Green Tiger",
  sellerFeeBasisPoints: 500, // optional
});

console.log("NFT minted at:", nft.address.toBase58());

const pinataResponse = await fetch("https://uploads.pinata.cloud/v3/files", {
  method: "POST",
  headers: { Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}` },
  body: formData,
});

