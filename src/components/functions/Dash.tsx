'use client'
import React, { useState } from "react";
import { Connection, clusterApiUrl, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";

const NFTMinter = () => {
  const [status, setStatus] = useState("");
  const [mintAddress, setMintAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const [balance, setBalance] = useState<number | null>(null);

  const PINATA_JWT = import.meta.env.VITE_PINATA_JWT;


   
 

  
  const nftMetadata = {
    name: "Happy Easter!",
    description: "This is a test NFT",
   image: 'https://images.nightcafe.studio/ik-seo/jobs/hP5zdOexBScqA1cf3oNp/hP5zdOexBScqA1cf3oNp--1--97xdp/pink-easter-bunny-hulk-character-with-rabbit-head-and-pink-fur-fighting-a-horde-of-giant-insects.jpg?tr=w-1200,c-at_max'
     // image:'https://images.nightcafe.studio/ik-seo/jobs/HOUXDlWPfOdQQn7kt6LE/HOUXDlWPfOdQQn7kt6LE--1--l7o05/sumo-wrestler-sitting-on-toilet.jpg?tr=w-1080,c-at_max'
 // image: 'https://images.nightcafe.studio/ik-seo/jobs/rI1iRPyMVDij7xejVJVR/rI1iRPyMVDij7xejVJVR--1--k54o1/giant-green-tiger-fights-the-horde-of-zombies-throwing-them-like-ragdolls-they-are-no-match-for-his-.jpg?tr=w-1200,c-at_max,'
  };

  const checkBalance = async (provider: any) => {
    try {
      const connection = new Connection(clusterApiUrl("devnet"));
      const balance = await connection.getBalance(provider.publicKey);
      const solBalance = balance / LAMPORTS_PER_SOL;
      setBalance(solBalance);
      setStatus(`Wallet balance: ${solBalance.toFixed(4)} SOL`);
    } catch (error) {
      console.error("Balance check failed:", error);
    }
  };

  const connectWallet = async () => {
    try {
      const provider = (window as any).solana;
      if (!provider || !provider.isPhantom) {
        throw new Error("Install Phantom wallet!");
      }
      
      await provider.connect();
      console.log("Wallet connected:", provider.publicKey.toString());
      await checkBalance(provider); // Check balance after connecting
      return provider;
    } catch (error) {
      console.error("Wallet connection failed:", error);
      throw error;
    }
  };

  const requestAirdrop = async (provider: any) => {
    try {
      setStatus("Requesting airdrop...");
      
      // Try alternative RPC endpoints
      const endpoints = [
        "https://api.devnet.solana.com",
        clusterApiUrl("devnet"),
        "https://devnet.helius-rpc.com/?api-key=demo"
      ];
      
      for (const endpoint of endpoints) {
        try {
          const connection = new Connection(endpoint);
          const signature = await connection.requestAirdrop(
            provider.publicKey,
            1 * LAMPORTS_PER_SOL // Reduced to 1 SOL to avoid limits
          );
          
          // Modern way to confirm transaction
          const latestBlockHash = await connection.getLatestBlockhash();
          await connection.confirmTransaction({
            blockhash: latestBlockHash.blockhash,
            lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
            signature: signature,
          });
          
          setStatus("Airdrop successful!");
          return;
        } catch (err) {
          console.log(`Failed with ${endpoint}:`, err);
          continue;
        }
      }
      
      throw new Error("All airdrop endpoints failed");
      
    } catch (error) {
      console.error("Airdrop failed:", error);
      setStatus("Airdrop failed - please visit https://faucet.solana.com to get test SOL manually");
    }
  };

  const uploadToPinata = async () => {
    setStatus("Uploading metadata...");
    
    const formData = new FormData();
    const blob = new Blob([JSON.stringify(nftMetadata)], { type: "application/json" });
    formData.append("file", blob, "metadata.json");

    const res = await fetch("https://uploads.pinata.cloud/v3/files", {
      method: "POST",
      headers: { Authorization: `Bearer ${PINATA_JWT}` },
      body: formData,
    });

    const result = await res.json();
    console.log('Pinata response:', result);
    
    const cid = result.data?.cid;
    if (!cid) throw new Error("Pinata upload failed");
    
    return `https://gateway.pinata.cloud/ipfs/${cid}`;
  };

  const mintNFT = async () => {
    if (loading) return;
    
    setLoading(true);
    setStatus("");
    setMintAddress("");
    
    try {
      // Connect wallet
      const provider = await connectWallet();
      if (!provider?.publicKey) {
        throw new Error("Wallet connection failed");
      }

      // Upload metadata to Pinata
      const metadataUri = await uploadToPinata();

      // Setup Solana connection and Metaplex
      setStatus("Setting up Metaplex...");
      const connection = new Connection(clusterApiUrl("devnet"));

    //   const connection = new Connection(clusterApiUrl("testnet"));

      const metaplex = Metaplex.make(connection).use(
        walletAdapterIdentity(provider)
      );

      // Mint the NFT
      setStatus("Minting NFT...");
      const { nft } = await metaplex.nfts().create({
        uri: metadataUri,
        name: nftMetadata.name,
        sellerFeeBasisPoints: 500, // 5% royalty
      });

      setMintAddress(nft.address.toBase58());
      setStatus("NFT minted successfully!");
      
    } catch (err: any) {
      console.error("Minting error:", err);
      setStatus(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

   const handleAirdrop = async () => {
    try {
      const provider = await connectWallet();
      await requestAirdrop(provider);
    } catch (error) {
      setStatus("Failed to request airdrop");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Mint Test NFT</h1>
      
      <div style={{ marginBottom: "20px" }}>
        <h3>NFT Details:</h3>
        <p><strong>Name:</strong> {nftMetadata.name}</p>
        <p><strong>Description:</strong> {nftMetadata.description}</p>
        <img 
          src={nftMetadata.image} 
          alt="NFT Preview" 
          style={{ maxWidth: "200px", borderRadius: "8px" }}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <button 
          onClick={handleAirdrop}
          disabled={loading}
          style={{ 
            padding: "10px 20px", 
            marginRight: "10px",
            backgroundColor: "#9945FF",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.6 : 1
          }}
        >
          Request Airdrop (1 SOL)
        </button>

        <button 
          onClick={mintNFT}
          disabled={loading}
          style={{ 
            padding: "10px 20px",
            backgroundColor: loading ? "#ccc" : "#14F195",
            color: loading ? "#666" : "black",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer"
          }}
        >
          {loading ? "Minting..." : "Upload & Mint NFT"}
        </button>
      </div>

      {status && (
        <p style={{ 
          padding: "10px", 
          backgroundColor: status.includes("Error") ? "#ffebee" : "#e8f5e8",
          color: status.includes("Error") ? "#c62828" : "#2e7d32",
          borderRadius: "4px"
        }}>
          {status}
        </p>
      )}
      
      {mintAddress && (
        <div style={{ 
          padding: "10px", 
          backgroundColor: "#f3e5f5", 
          borderRadius: "4px",
          marginTop: "10px"
        }}>
          <p><strong>NFT Address:</strong></p>
          <p style={{ wordBreak: "break-all", fontSize: "12px" }}>{mintAddress}</p>
          <p>
            <a 
              href={`https://explorer.solana.com/address/${mintAddress}?cluster=devnet`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#9945FF" }}
            >
              View on Solana Explorer
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default NFTMinter;