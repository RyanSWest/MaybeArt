import React, { useState } from 'react';
import { Metaplex, keypairIdentity, bundlrStorage } from "@metaplex-foundation/js";
import { Connection, clusterApiUrl, Keypair } from "@solana/web3.js";

function NFTMinter() {
  const [isUploading, setIsUploading] = useState(false);
  const [mintAddress, setMintAddress] = useState('');
  const [status, setStatus] = useState('');

  const uploadAndMint = async () => {
    try {
      setIsUploading(true);
      setStatus('Uploading metadata to Pinata...');

      // Step 1: Upload metadata to Pinata
      const nftMetadata = {
        name: "Giant Green Tiger",
        description: "Tiger fights the horde of zombies throwing them like ragdolls",
        image: "https://images.nightcafe.studio/ik-seo/jobs/rI1iRPyMVDij7xejVJVR/rI1iRPyMVDij7xejVJVR--1--k54o1/giant-green-tiger-fights-the-horde-of-zombies-throwing-them-like-ragdolls-they-are-no-match-for-his-.jpg?tr=w-1600,c-at_max",
        attributes: [
          {
            trait_type: "Type",
            value: "AI Art"
          },
          {
            trait_type: "Theme", 
            value: "Tiger vs Zombies"
          }
        ]
      };

      const jsonFile = new File([JSON.stringify(nftMetadata)], "metadata.json", { 
        type: "application/json" 
      });

      const formData = new FormData();
      formData.append("file", jsonFile);
      formData.append("network", "public");

      const keyvalues = {
        name: "NFT Metadata - Giant Green Tiger",
        description: "Metadata for NFT minting"
      };

      formData.append("keyvalues", JSON.stringify(keyvalues));

      const pinataResponse = await fetch("https://uploads.pinata.cloud/v3/files", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
        },
        body: formData,
      });

      const pinataResult = await pinataResponse.json();
      console.log("Pinata result:", pinataResult);

      if (!pinataResult.IpfsHash) {
        throw new Error("Failed to upload to Pinata");
      }

      setStatus('Metadata uploaded! Now minting NFT...');
      
      // Step 2: Mint the NFT
      const connection = new Connection(clusterApiUrl("devnet"));
      
      // For now, we'll create a temporary keypair
      // In a real app, you'd use a connected wallet
      const wallet = Keypair.generate();
      
      const metaplex = Metaplex.make(connection)
        .use(keypairIdentity(wallet))
        .use(bundlrStorage());

      const metadataUri = `https://gateway.pinata.cloud/ipfs/${pinataResult.IpfsHash}`;
      
      const { nft } = await metaplex.nfts().create({
        uri: metadataUri,
        name: "Giant Green Tiger",
        sellerFeeBasisPoints: 500, // 5% royalty
      });

      setMintAddress(nft.address.toString());
      setStatus('NFT Successfully Minted!');
      console.log("NFT Minted!", {
        address: nft.address.toString(),
        metadataUri: metadataUri
      });

    } catch (error) {
      console.error("Error:", error);
      setStatus(`Error: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>NFT Minter</h1>
      <div style={{ marginBottom: '20px' }}>
        <h3>Giant Green Tiger vs Zombies</h3>
        <img 
          src="https://images.nightcafe.studio/ik-seo/jobs/rI1iRPyMVDij7xejVJVR/rI1iRPyMVDij7xejVJVR--1--k54o1/giant-green-tiger-fights-the-horde-of-zombies-throwing-them-like-ragdolls-they-are-no-match-for-his-.jpg?tr=w-1600,c-at_max"
          alt="Giant Green Tiger"
          style={{ maxWidth: '300px', borderRadius: '8px' }}
        />
      </div>

      <button 
        onClick={uploadAndMint} 
        disabled={isUploading}
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          backgroundColor: isUploading ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: isUploading ? 'not-allowed' : 'pointer'
        }}
      >
        {isUploading ? 'Processing...' : 'Upload & Mint NFT'}
      </button>

      {status && (
        <div style={{ 
          marginTop: '20px', 
          padding: '10px', 
          backgroundColor: '#f8f9fa',
          border: '1px solid #dee2e6',
          borderRadius: '4px'
        }}>
          <strong>Status:</strong> {status}
        </div>
      )}

      {mintAddress && (
        <div style={{ 
          marginTop: '20px', 
          padding: '15px',
          backgroundColor: '#d4edda',
          border: '1px solid #c3e6cb',
          borderRadius: '4px'
        }}>
          <h4>🎉 NFT Successfully Minted!</h4>
          <p><strong>Mint Address:</strong></p>
          <code style={{ wordBreak: 'break-all' }}>{mintAddress}</code>
          <br />
          <small>You can view this NFT on Solana Explorer (devnet)</small>
        </div>
      )}
    </div>
  );
}

export default NFTMinter;