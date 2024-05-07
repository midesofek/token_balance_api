const axios = require("axios");
const fetchDecimals = require("../../../utils/utils");
require("dotenv").config();

const { ETHERSCAN_API_KEY: ETHERSCAN_KEY, ETH_RPC_URL } = process.env;
const BASE_URL = "https://api.etherscan.io";

// Function to fetch any ERC20 token balance using its ContractAddress
async function erc20TokenBalanceController(req, res) {
  const { userAddress, contractAddress } = req.body;

  try {
    const decimals = await fetchDecimals(
      contractAddress,
      ETH_RPC_URL,
      BASE_URL,
      ETHERSCAN_KEY
    );

    const response = await axios.get(
      `${BASE_URL}/api?module=account&action=tokenbalance&contractaddress=${contractAddress}&address=${userAddress}&tag=latest&apikey=${ETHERSCAN_KEY}`
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
