// @ts-nocheck


import React from 'react';
import { Connection, PublicKey, PublicKeyInitData } from '@solana/web3.js';
import { Metaplex } from '@metaplex-foundation/js';
import {useState,useEffect} from 'react'
import axios, { AxiosResponse, AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';

const  Gallery=()=> {
  const [img,setImg]=useState<any>( [])
  const[nftImg,setNftImg]=useState<any>()
  const[url,setUrl]=useState<string>()


  // Method 1: Using Metaplex SDK (recommended)
 async function createUrl2() {
    let res: string = '';
    try {
        const fileRequest = await axios.get<any>(
            "https://api.pinata.cloud/data/pinList?status=pinned&pageLimit=1",
            {
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
                },
            },
        );
        
        const fileData: any = fileRequest.data;
        console.log('YOBITCH', fileData);
        
        // Get the CID
        const cid = fileData.rows[0].ipfs_pin_hash;
        
        // Put together the url
        const url = `https://${import.meta.env.VITE_PINATA_GATEWAY}/ipfs/${cid}`;
        console.log(url);
        
        // Use a public gateway
        const publicGatewayUrl = `https://ipfs.io/ipfs/${cid}`;
        res = publicGatewayUrl;
        console.log('BITCH', publicGatewayUrl, 'REZMUTHAFUNKC', res);
        
        return res; // now this returns the actual URL
        
    } catch (error) {
        console.log(error);
    }
    
    console.log("WHATTHEFUCK", res);
    return res;
}
  




  
  async function list() {
		// const [pics,setPics]=useState([])
	const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4MWUzNWY0OC0wNmFiLTRkYjUtYmU2Yi05N2EzYzVmZTgzYjIiLCJlbWFpbCI6InNyaWhhbnVtYW45NkBteXlhaG9vLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJlNDRmNzVlZTVjMzcyNWFhMWExYSIsInNjb3BlZEtleVNlY3JldCI6IjRjN2JiMDlhMDg1OTVhOTQ1Zjk1ZWE1NzA1NDQyMjBhZTZmMDhkOWZiMmJhNzYyOTQ4MDkyODNjZmYwODY2OTAiLCJleHAiOjE3ODY4MDcxOTN9.dUQ6YgKj8iviVLzJtcAn1SuwtRpEQcpfOkb_VdFM0fw'

    let a =[]
 	try {
		// Build optional queries
		const queryParams = new URLSearchParams({ status: "pinned" });

		// Filter by name
		//queryParams.append("metadata[name]", "hello.txt");

		// Filter by group ID
		// queryParams.append("groupId", "18893556-de8e-4229-8a9a-27b95468dd3e");

		// Filter by mime type
		// queryParams.append("mimeType", "text/plain");

		// Filter by CID
		//queryParams.append("cid", "QmVLwvmGehsrNEvhcCnnsw5RQNseohgEkFNN1848zNzdng");

		// Set result limit
		//queryParams.append("pageLimit", "100");

		// Add pagination
		// queryParams.append(
		// 	"pageOffset",
		// 	"100",
		// );
        
		const queryString = queryParams.toString();

		// Construct the URL
		const url = `https://api.pinata.cloud/data/pinList${queryString ? `?${queryString}` : ""}`;
		// Fetch list of files
		const filesRequest = await fetch(url, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		// Parse the response and log it out
		const files = await filesRequest.json();
	 
		a.push(files.rows)
		// setPics(files.rows)
	} catch (error) {
		console.log(error);
	}
   console.log("PICS",a )
  let arse = a.forEach((e)=> {
	console.log('EEE', e.metadata )
  })
 console.log(arse)
 return a
 }
 

useEffect(()=>{
const goGetter= async()=>{
    
   const faggy= await list()
   console.log("FAGGY",faggy)
   setImg(faggy)
}

const getUrl = async  ()=>{
    const newUrl=await createUrl2()
    console.log('********',newUrl)
    setUrl(newUrl)

 }


//  const letsSee = await axios.get(url).then(res=>{
//     console.log("DataBiACH",res.data)
//  })
goGetter()
getUrl()

 


 

},[])

console.log("YOBITCH",img)
console.log('YOMUTHAFUKKA__URL',url)

 const rabbit ='https://amethyst-peaceful-damselfly-293.mypinata.cloud/files/bafkreieayk353qe5voovmfx3xlx6x2efgbakxmrjak5clrlxnltofgea3e?X-Algorithm=PINATA1&X-Date=1755749345&X-Expires=30&X-Method=GET&X-Signature=b1ce26e9558386bbf0713856f1c20a59735dab0a9277756b42ca2e565752936c'





 const tokenAccountAddress = 'AKtsoqyKNjL5BhfcZwfuGESC4N88GZKQDm25Aaje9WJ7';

const connection = new Connection('https://api.devnet-beta.solana.com');








// async function getMintAddress(tokenAccountAddress: PublicKeyInitData) {
//     const tokenAccountInfo = await connection.getParsedAccountInfo(new PublicKey(tokenAccountAddress));
//     return tokenAccountInfo.value.data.parsed.info.mint;
// }

// Example usage
// const tokenAccountAddress = 'YourTokenAccountAddressHere';
// getMintAddress(tokenAccountAddress).then(mintAddress => {
//     console.log('Mint Address:', mintAddress);
// });

async function getNFTData() {
    // Connect to devnet
    const connection = new Connection('https://api.devnet.solana.com');
    const metaplex = Metaplex.make(connection);
    console.log("BEEP")
    // Your NFT mint address
    const mintAddress = new PublicKey('48pVRSv6wgMHQkipso4LGCnwnqdM9s6X8ioMdhcdbBTy');

    // const mintAddress = new PublicKey('5fk5g3UvHcHYwvzstxDvd5Hfrs8tcri4YhtSTFQyT2pW')
    try {
        // Fetch the NFT
        const nft = await metaplex.nfts().findByMint({ mintAddress });
        
        // The metadata object
        const metadata = {
            name: nft.name,
            symbol: nft.symbol,
            description: nft.json?.description,
            image: nft.json?.image,
            attributes: nft.json?.attributes || [],
            mintAddress: nft.address.toString(),
            updateAuthority: nft.updateAuthorityAddress.toString(),
            creators: nft.creators
        }; 
        
        console.log('NFT Metadata:', nft ,metadata);
        return metadata;
        
    } catch (error) {
        console.error('Error fetching NFT:', error);
    }
}

// Method 2: Even simpler - just use the Metaplex method
async function getNFTDataSimple() {
    const connection = new Connection('https://api.devnet.solana.com');
    const metaplex = Metaplex.make(connection);
    
    try {
        const nft = await metaplex.nfts().findByMint({ 
            mintAddress: new PublicKey('88DBET2jBb8w4KvZJdcQTDZmKB4eaV4fzW47uBV4rFNd')
            
        });
       
        // setImg(nft.uri)
        // Just return the essential data
        return {
            name: nft.name,
            image: nft.uri ,
            description: nft.json?.description,
            attributes: nft.json?.attributes || []
        };
        
    } catch (error) {
        console.error('Error fetching NFT:', error);
        return null;
    }
}

// Usage example
getNFTDataSimple().then(metadata => {
    if (metadata) {
        // Now you can use this data to create your card
        //  setNftImg(metadata.image.toString())
        // displayNFTCard(metadata);
     }
});

// Example function to create a display card
// function displayNFTCard(metadata: { name: any; symbol?: any; description: any; image: any; attributes: any; mintAddress?: any; updateAuthority?: any; creators?: any; }) {
//     const cardHTML = `
//         <div class="nft-card">
//             <img src="${img}" alt="${metadata.name}" />
//             <h3>${metadata.name}</h3>
//             <p>${metadata.description || 'No description'}</p>
//             <div class="attributes">
//                 ${metadata.attributes.map((attr: { trait_type: any; value: any; }) => 
//                     `<span class="trait">${attr.trait_type}: ${attr.value}</span>`
//                 ).join('')}
//             </div>
//         </div>
//     `;
    
//     document.body.innerHTML = cardHTML;
// }

console.log('YOBITCH',img)

// async const balls =axios.get(url).then(res=>{
//     console.log("REZZ",res.data);
// })
 
// For Node.js, install packages:
// npm install @solana/web3.js @metaplex-foundation/js
 
return (
    <div>
   <h1>Hey Fags</h1> 


 <span>{nftImg}</span>

     <img 
          src={nftImg} 
          alt="NFT Preview" 
          style={{ maxWidth: "800px", borderRadius: "8px solid:red" }}
        /> 
   <img 
          src={Nftimg} 
          alt="NFT Preview" 
          style={{ maxWidth: "800px", borderRadius: "8px solid:red" }}
        /> 
        <img src ={rabbit}/>
        <button onClick= {getNFTData}>  
            CLIT
            </button>
          
         {img.map((item: any, index: number) => (
    <img key={index} src={item.imageUrl} alt="art" />
))}

           

    // </div>
)

}
export default Gallery