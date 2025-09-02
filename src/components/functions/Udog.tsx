 import {createUrl} from './create-ipfs'
import{useState, useEffect, useRef}from 'react'
import axios, { AxiosResponse, AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';



const Udog =()=>{
const [url, setUrl]= useState('')
 
const [preview,setPreview]=useState<string>('')

const [artData, setArtData] = useState({
  imageUrl:'',
    title: '',
    artist: '',
    price: '',
    description: ''
});


const [selectedFile, setSelectedFile] = useState<File | null>(null);  // This was missing!

//    const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
const kaiju ='https://www.artstation.com/artwork/LRA3Vw'
  async function createUrl() {
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
}async function createUrl2() {
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
  
 

useEffect(()=>{
  const goGetem= async ()=>{
     const faggy=  await createUrl2()
 console.log('FAGGY',faggy)
 setUrl(faggy)
  };
  goGetem();
}

,)



const uploadFileToPinata = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await axios.post(
        'https://api.pinata.cloud/pinning/pinFileToIPFS', // Changed to file endpoint
      formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${import.meta.env.VITE_PINATA_JWT}`
            }
        }
    );
    
    return response.data;
};
 function DebugEnv() {
  console.log('=== FULL DEBUG ===');
  console.log('All env vars:', import.meta.env);
  console.log('Keys:', Object.keys(import.meta.env));
  console.log('JWT attempt 1:', import.meta.env.VITE_PINATA_JWT);
  console.log('JWT attempt 2:', import.meta.env['VITE_PINATA_JWT']);
  console.log('Gateway attempt 1:', import.meta.env.VITE_PINATA_GATEWAY);
  console.log('==================');
  
 }
 console.log('FAGGY?',url)


 DebugEnv()


 const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        setSelectedFile(file);
        const prevUrl = URL.createObjectURL(file)
        setPreview(prevUrl)
        setArtData({...artData,imageUrl:''})
    }
};


async function upload(data:any) {
   const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', {
    pinataContent:data,
    pinataOptions:{
      cidVersion:1
    },
    pinataMetadata:{
      name:'MyJSON'
    },
     headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${import.meta.env.VITE_PINATA_JWT}`
            }




   })
   return res.data
}
 









async function upload2(data:any) {
   const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', {
    pinataContent:data,
    pinataOptions:{
      cidVersion:1
    },
    pinataMetadata:{
      name:'MyJSON'
    },
     headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${import.meta.env.VITE_PINATA_JWT}`
            }




   })
   return res.data
}
 
const handleUploadWithURL = async (photoURL: string) => {
    try {
        const metadata = {
            title: artData.title,
            artist: artData.artist,
            price: artData.price,
            description: artData.description,
            imageUrl: artData.imageUrl, // use the existing URL
            timestamp: new Date().toISOString()
        };
        
        const response = await axios.post(
'https://api.pinata.cloud/pinning/pinJSONToIPFS'
  ,          {
                pinataContent: metadata,
                pinataMetadata: {
                    name: `${artData.title} - Art Piece`
                }
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_PINATA_JWT}`
                }
            }
        );
        
        console.log('Art piece with URL uploaded:', response.data);
        
    } catch (error) {
        console.error('Upload failed:', error);
    }
};
const handleUpload = async () => {

  if(selectedFile){

    upload(selectedFile)
  }

  else if(artData.imageUrl){
    try {
        const result = await handleUploadWithURL( artData.imageUrl);
        console.log('Upload successful:', result);
    } catch (error) {
        console.error('Upload failed:', error);
    }}
};



//CREATE A PREVIEW
const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArtData({...artData, imageUrl: e.target.value});
    
    // Clear file selection if they're using URL instead
    setSelectedFile(null);
    setPreview (artData.imageUrl);
};


const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        try {
            const result = await uploadFileToPinata(file);
            console.log('File uploaded:', result);
        } catch (error) {
            console.error('Upload failed:', error);
        }
    }
};

// Then:
<input type="file" onChange={handleFileUpload} />
// Then use it:

const fileInputRef = useRef<HTMLInputElement>(null);

const handleButtonClick = () => {
    fileInputRef.current?.click(); // This opens the file picker
};



  
return(
    <div>
     <button onClick={handleUpload}>Upload</button>
    

 



<form>



  <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileSelect}
        ref={fileInputRef}
        style={{ display: 'none' }}
    />
    
    {/* Custom button that looks how you want */}
    <button type="button" onClick={handleButtonClick}>
        Choose File from Computer
    </button>
    
    {/* Show selected file name */}
    {selectedFile && <p>Selected: {selectedFile.name}</p>}
    <input 
        type="text" 
        placeholder="Art Title"
        value={artData.title}
        onChange={(e) => setArtData({...artData, title: e.target.value})}
    />
    
    <input 
        type="text" 
        placeholder="Artist Name"
        value={artData.artist}
        onChange={(e) => setArtData({...artData, artist: e.target.value})}
    />
    
    <input 
        type="number" 
        placeholder="Price ($)"
        value={artData.price}
        onChange={(e) => setArtData({...artData, price: e.target.value})}
    />
    
    <input 
        type="url" 
        placeholder="Image URL (https://...)"
        value={artData.imageUrl}
        onChange={(e) => setArtData({...artData, imageUrl: e.target.value})}
    />
    
    <textarea 
        placeholder="Description"
        value={artData.description}
        onChange={(e) => setArtData({...artData, description: e.target.value})}
    />
    
    <button type="button" onClick={handleUpload }>
        Upload Art with URL
    </button>

  
    <button type="button" onClick={handleButtonClick}>
        Choose File from Computer
    </button>
    
    <input 
        type="url" 
        placeholder="Or paste image URL"
        value={artData.imageUrl}
        onChange={handleUrlChange}
    />
    
    {/* Preview - show URL image OR file preview, but not both */}
{preview ? (
    <div>
        <p>Preview (from file):</p>
        <img src={preview} alt="Preview" style={{width: '300px', height: 'auto'}} />
    </div>
) : artData.imageUrl ? (
    <div>
        <p>Preview (from URL):</p>
        <img src={artData.imageUrl} alt="Preview" style={{width: '300px', height: 'auto'}} />
    </div>
) : null}
    
    {artData.imageUrl && !preview && (
        <div>
            <p>Preview:</p>
            <img src={artData.imageUrl} alt="Preview" style={{width: '300px', height: 'auto'}} />
        </div>
    )}
    
    {/* Other form fields */}
    <input placeholder="Title" onChange={(e) => setArtData({...artData, title: e.target.value})} />
    <input placeholder="Artist" onChange={(e) => setArtData({...artData, artist: e.target.value})} />
    <input placeholder="Price" onChange={(e) => setArtData({...artData, price: e.target.value})} />
    
    <button type="button" onClick={handleUpload}>
        ****Upload Art
    </button>






</form>


 








    </div>

    
)

 

}
export default Udog
