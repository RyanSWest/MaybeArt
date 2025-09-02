import React, { useState } from 'react';
import { Metaplex, keypairIdentity,  irysStorage  } from "@metaplex-foundation/js";
import { Connection, clusterApiUrl, Keypair } from "@solana/web3.js";

function Page() {
  const [isUploading, setIsUploading] = useState(false);
  const [mintAddress, setMintAddress] = useState('');
  const [status, setStatus] = useState('');

  const uploadAndMint = async () => {
    try {
      setIsUploading(true);
      setStatus('Uploading metadata to Pinata...');

      // Upload to Pinata
      const nftMetadata = {
        name: "Giant Green Tiger",
        description: "Tiger fights the horde of zombies throwing them like ragdolls",
        image: "https://images.nightcafe.studio/ik-seo/jobs/rI1iRPyMVDij7xejVJVR/rI1iRPyMVDij7xejVJVR--1--k54o1/giant-green-tiger-fights-the-horde-of-zombies-throwing-them-like-ragdolls-they-are-no-match-for-his-.jpg?tr=w-1600,c-at_max",
        attributes: [
          { trait_type: "Type", value: "AI Art" },
          { trait_type: "Theme", value: "Tiger vs Zombies" }
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

      if (!pinataResult.IpfsHash) {
        throw new Error("Failed to upload to Pinata");
      }

      setStatus('Metadata uploaded! Now minting NFT...');
      
      // Mint the NFT
      const connection = new Connection(clusterApiUrl("devnet"));
      const wallet = Keypair.generate();
      
      const metaplex = Metaplex.make(connection)
        .use(keypairIdentity(wallet))
        .use( irysStorage ());

      const metadataUri = `https://gateway.pinata.cloud/ipfs/${pinataResult.IpfsHash}`;
      
      const { nft } = await metaplex.nfts().create({
        uri: metadataUri,
        name: "Giant Green Tiger",
        sellerFeeBasisPoints: 500,
      });

      setMintAddress(nft.address.toString());
      setStatus('NFT Successfully Minted!');

    } catch (error: any) {
      console.error("Error:", error);
      setStatus(`Error: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Dashboard</h1>
      
      <section>
        <h2>NFT Minter</h2>
        
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
          <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f8f9fa' }}>
            <strong>Status:</strong> {status}
          </div>
        )}

        {mintAddress && (
          <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#d4edda' }}>
            <h4>🎉 NFT Successfully Minted!</h4>
            <p><strong>Mint Address:</strong></p>
            <code style={{ wordBreak: 'break-all' }}>{mintAddress}</code>
          </div>
        )}
      </section>
    </div>
  );
}

export default Page;