import {useState, useEffect} from 'react'
import {main} from './list-files'

export const Upload =()=>{
 const PinUrl ='http://amethyst-peaceful-damselfly-293.mypinata.cloud'
            const [pics,setPics]=useState([])
               const a =[]



    // HERES THE GETTING THE APICS FROM PINATA   ?         
    async function getter() {
        // const [pics,setPics]=useState([])
    const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4MWUzNWY0OC0wNmFiLTRkYjUtYmU2Yi05N2EzYzVmZTgzYjIiLCJlbWFpbCI6InNyaWhhbnVtYW45NkBteXlhaG9vLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJlNDRmNzVlZTVjMzcyNWFhMWExYSIsInNjb3BlZEtleVNlY3JldCI6IjRjN2JiMDlhMDg1OTVhOTQ1Zjk1ZWE1NzA1NDQyMjBhZTZmMDhkOWZiMmJhNzYyOTQ4MDkyODNjZmYwODY2OTAiLCJleHAiOjE3ODY4MDcxOTN9.dUQ6YgKj8iviVLzJtcAn1SuwtRpEQcpfOkb_VdFM0fw'

            

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
       setPics(files.rows)
    } catch (error) {
        console.log(error);
    }

  console.log("PICS",pics ,a)
 
 



 
}





// UPLOAD A NEW PIC
async function UploadFile() {
	const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4MWUzNWY0OC0wNmFiLTRkYjUtYmU2Yi05N2EzYzVmZTgzYjIiLCJlbWFpbCI6InNyaWhhbnVtYW45NkBteXlhaG9vLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJlNDRmNzVlZTVjMzcyNWFhMWExYSIsInNjb3BlZEtleVNlY3JldCI6IjRjN2JiMDlhMDg1OTVhOTQ1Zjk1ZWE1NzA1NDQyMjBhZTZmMDhkOWZiMmJhNzYyOTQ4MDkyODNjZmYwODY2OTAiLCJleHAiOjE3ODY4MDcxOTN9.dUQ6YgKj8iviVLzJtcAn1SuwtRpEQcpfOkb_VdFM0fw'
 	try {
		// Construct a file according to the Web API
		const file = new File(["Hello World!"], "hello.txt");

		// Create form data and attach the file
		const data = new FormData();
		console.log(data)
		data.append("file", file);
         console.log('MUTHAFUCKKA',data)
		// Optional: Attach other info about the file

		// Custom name and keyvalues
		const metadata = JSON.stringify({
			name: "My cool file",
			keyvalues: {
				env: "prod",
				user: "sudo",
			},
		});
		data.append("pinataMetadata", metadata);

		// Change CID version or add to a Group
		// const options = JSON.stringify({
		// 	cidVersion: 1,
		// 	groupId: "my-group-id",
		// });
		// data.append("pinataOptions", options);

		// Upload the file
		const uploadRequest = await fetch(
			"https://api.pinata.cloud/pinning/pinFileToIPFS",
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
				},
				body: data,
                imgSrc:'https://images.nightcafe.studio/jobs/hSiC7JwbSNdYF9J5QInC/hSiC7JwbSNdYF9J5QInC--1--a1plm.jpg?tr=w-1600,c-at_max'
			},
		);
		// Parse the response and log it out
		const upload = await uploadRequest.json();
		console.log(upload);
	} catch (error) {
		console.log(error);
	}
}

// main();

useEffect(()=>{


   const crap = getter()
   console.log("CRAP",pics,)
   console.log("DKLJFL",a)
}, [])

 
return (

    <div>  
     <h1>UPLOAD CUNT</h1> 


     {pics.map((e)=> {
        return (
            <div className="max-w-xl mx-auto py-6 sm:px-6 lg:px-8 text-center">
              {/* {key= e.id} */}
             <h3>{e.ipfs_pin_hash}</h3>
             <img src = {`${PinUrl}/ipfs/${e.ipfs_pin_hash}`}/>

                </div>
        )
     })}

   <button onClick={UploadFile}> PUSH</button>

    </div>
)


}

export default Upload