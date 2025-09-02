import React, { useState } from 'react';
import { Metaplex, keypairIdentity,  irysStorage  } from "@metaplex-foundation/js";
import { Connection, clusterApiUrl, Keypair } from "@solana/web3.js";
import Rhino from '../imgs/RHINOGUN.jpg'
import Gorilla from '../imgs/Gorilla1.jpg'
import Drag from '../imgs/Dragon2.jpg'

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
      <h1 className ='cyber-text-h1'>Gallery</h1>
      
      <section>





         <div>  

         <div className='time'> 
                <img
       className ='pic'
       
      //  src ='https://www.instagram.com/p/BhS5gc8nYXz/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA%3D%3D'/>

          src ='https://images.nightcafe.studio/ik-seo/jobs/oBLDwBFxM2XVyEt1m2i7/oBLDwBFxM2XVyEt1m2i7--1--4xbzq/giant-green-tiger-with-futuristic-girl-with-machine-gun-fighting-a-horde-of-zombies-postapocalyptic-.jpg?tr=w-1600,c-at_max'/>
              </div>

                <div className='time'> 
                <img
       className ='pic'
       
       src ='https://images.nightcafe.studio/jobs/S9UynfQA5zJeZoz1JiQ9/S9UynfQA5zJeZoz1JiQ9--0--brwp2.jpg?tr=w-1600,c-at_max'/>


              </div>
              <div className ='time'>
               <img 
                className ='pic'
                // src ='https://images.nightcafe.studio/ik-seo/jobs/m9nH0Ue0KMjqkqmx2g3V/m9nH0Ue0KMjqkqmx2g3V--1--tvzzh/ehonda-with-giant-sushi.jpg?tr=w-1600,c-at_max'/>
                src ='https://images.nightcafe.studio/ik-seo/jobs/DCDMgSGLULLI1Z2ttpC2/DCDMgSGLULLI1Z2ttpC2--1--l2n82/geisha-girls-sitting-in-giant-bowl-of-ramen.jpg?tr=w-1600,c-at_max'/>
              </div>

              <div className ='time'>
               <img 
                className ='pic'
                // src ='https://images.nightcafe.studio/ik-seo/jobs/m9nH0Ue0KMjqkqmx2g3V/m9nH0Ue0KMjqkqmx2g3V--1--tvzzh/ehonda-with-giant-sushi.jpg?tr=w-1600,c-at_max'/>
                src ='https://images.nightcafe.studio/ik-seo/jobs/DCDMgSGLULLI1Z2ttpC2/DCDMgSGLULLI1Z2ttpC2--1--l2n82/geisha-girls-sitting-in-giant-bowl-of-ramen.jpg?tr=w-1600,c-at_max'/>
              </div>




              </div>
         
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