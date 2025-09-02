 import { PinataSDK } from "pinata";

 const Uploader =()=> {
const pinata = new PinataSDK({
  pinataJwt: import.meta.env.VITE_PINATA_JWT,
  pinataGateway: import.meta.env.VITE_PINATA_GATEWAY,
});



let s = ''

async function main() {
  try {
    const file = new File(["hello world!"], "hello.txt", { type: "text/plain" });
    const upload = await pinata.upload.public.file(file);
    console.log(upload, upload.cid);
    s=upload.cid
  } catch (error) {
    console.log(error);
  }
}
 

  main();


return (


  <div> 
    



    <h1>FAGG</h1>




  </div>
)




}
export default Uploader