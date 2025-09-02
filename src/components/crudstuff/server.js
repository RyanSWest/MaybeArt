const web3 = require("@solana/web3.js");
(async () => {
  const solana = new web3.Connection("https://white-compatible-road.solana-devnet.quiknode.pro/2d9c21986e7110bea887b43b6bcf84346ab197a0/");
  console.log(await solana.getSlot());
})();