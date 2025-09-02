export async function createUrl() {
    


 
  
	let res ='' 
	try {
		// Fetch the lastest file and build a link
		 
		const fileRequest = await fetch(
			"https://api.pinata.cloud/data/pinList?status=pinned&pageLimit=1",
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
				},
			},
		);
		const fileData = await fileRequest.json();
		console.log('VAGINA', fileData)

		// Get the CID
		const cid = fileData.rows[0].ipfs_pin_hash;

		// Put together the url
		const url = `https://${import.meta.env.VITE_SERVER_URL}/ipfs/${cid}`;

		console.log(url);

		// Use a public gateway
		const publicGatewayUrl = `https://ipfs.io/ipfs/${cid}`;
		res = publicGatewayUrl
		console.log('BITCH',publicGatewayUrl,'REZMUTHAFUNKC',res);
			 

	} catch (error) {
		console.log(error);
	}
	return res
 }
  
createUrl()