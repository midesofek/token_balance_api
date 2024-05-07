const ethers = require("ethers");
const axios = require("axios");

async function fetchDecimals(tokenAddress, rpcUrl, baseUrl, scanKey) {
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const res = await axios.get(`
      ${baseUrl}/api?module=contract&action=getabi&address=${tokenAddress}&apikey=${scanKey}`);
  const abi = res.data.result;
  const tokenContract = new ethers.Contract(tokenAddress, abi, provider);
  const decimals = await tokenContract.decimals();
  console.log(decimals);
  return decimals;
}

module.exports = fetchDecimals;
