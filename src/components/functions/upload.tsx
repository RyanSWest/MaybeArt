import {useState, useEffect} from 'react'
import {main} from './list-files'

export const Upload =()=>{
    const a: any[] = []

    		const [pics,setPics]=useState([])

        async function getter() {
		// const [pics,setPics]=useState([])
	const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4MWUzNWY0OC0wNmFiLTRkYjUtYmU2Yi05N2EzYzVmZTgzYjIiLCJlbWFpbCI6InNyaWhhbnVtYW45NkBteXlhaG9vLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJlNDRmNzVlZTVjMzcyNWFhMWExYSIsInNjb3BlZEtleVNlY3JldCI6IjRjN2JiMDlhMDg1OTVhOTQ1Zjk1ZWE1NzA1NDQyMjBhZTZmMDhkOWZiMmJhNzYyOTQ4MDkyODNjZmYwODY2OTAiLCJleHAiOjE3ODY4MDcxOTN9.dUQ6YgKj8iviVLzJtcAn1SuwtRpEQcpfOkb_VdFM0fw'

    // let  [pics,setPics]=useState([])
    	   

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

  console.log("PICS",pics )
 
 



 return a

}
useEffect(()=>{


   const crap = getter()
   console.log("CRAP",pics)
}, [])

 
return (

    <div>  
     <h1>UPLOAD CUNT</h1> 


     {pics.map((e)=> {
        return (
            <div>
            
             <h3>{e.metadata.name}</h3>

                </div>
        )
     })}

   <button onClick={getter}> PUSH</button>

    </div>
)


}

export default Upload