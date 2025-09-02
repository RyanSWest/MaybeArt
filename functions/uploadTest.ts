import { useState } from "react";
import axios from "axios";

export default function UploadTest() {
  const [file, setFile] = useState( {});
  const [hash, setHash] = useState("");

  const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4MWUzNWY0OC0wNmFiLTRkYjUtYmU2Yi05N2EzYzVmZTgzYjIiLCJlbWFpbCI6InNyaWhhbnVtYW45NkBteXlhaG9vLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJlNDRmNzVlZTVjMzcyNWFhMWExYSIsInNjb3BlZEtleVNlY3JldCI6IjRjN2JiMDlhMDg1OTVhOTQ1Zjk1ZWE1NzA1NDQyMjBhZTZmMDhkOWZiMmJhNzYyOTQ4MDkyODNjZmYwODY2OTAiLCJleHAiOjE3ODY4MDcxOTN9.dUQ6YgKj8iviVLzJtcAn1SuwtRpEQcpfOkb_VdFM0fw"; // temporary, just for testing


 
    
   const img='https://amethyst-peaceful-damselfly-293.mypinata.cloud/ipfs/bafkreigdkkfqtyadxexthikmvtqfpwyfgcz7mcqpflmidzaa73n7oawb2e'
   
   
  const upload = async () => {
    if (!file) return alert("Pick a file!");
    const formData = new FormData();
    formData.append("file", img);

    try {
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        { headers: { Authorization: `Bearer ${JWT}` } }
      );
      setHash(res.data.IpfsHash);
      console.log(res.data)
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

   
}
