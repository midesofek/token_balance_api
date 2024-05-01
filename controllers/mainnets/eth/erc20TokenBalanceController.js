const ethers = require("ethers");
const axios = require("axios");
require("dotenv").config();

const { ETHERSCAN_API_KEY: ETHERSCAN_KEY, ETH_RPC_URL } = process.env;

async function fetchDecimals(tokenAddress) {
  const provider = new ethers.providers.JsonRpcProvider(ETH_RPC_URL);
  const res = await axios.get(`
    https://api.etherscan.io/api?module=contract&action=getabi&address=${tokenAddress}&apikey=${ETHERSCAN_KEY}`);
  const abi = res.data.result;
  console.log(abi);
  const tokenContract = new ethers.Contract(tokenAddress, abi, provider);
  const decimals = await tokenContract.decimals();
  console.log(decimals);
  return decimals;
}

// Function to fetch any ERC20 token balance using its ContractAddress
async function erc20TokenBalanceController(req, res) {
  const { userAddress, contractAddress } = req.body;

  try {
    const decimals = await fetchDecimals(contractAddress);

    const response = await axios.get(
      `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${contractAddress}&address=${userAddress}&tag=latest&apikey=${ETHERSCAN_KEY}`
    );
    const balanceInWei = response.data.result;
    const balanceInEth = balanceInWei / 10 ** decimals; // Convert Wei to Ether
    console.log(`Token Balance: ${balanceInEth}`);
    res.status(200).json(balanceInEth);
    return balanceInEth;
  } catch (error) {
    console.error("Error fetching ETH balance:", error.message);
    return 0;
  }
}

module.exports = erc20TokenBalanceController;
