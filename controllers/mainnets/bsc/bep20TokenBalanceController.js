const axios = require("axios");
require("dotenv").config();

const { BSCSCAN_API_KEY: BSCSCAN_KEY, BNB_RPC_URL } = process.env;
const BASE_URL = "https://api.bscscan.com";

// Function to fetch any BEP20 token balance using its ContractAddress
async function bep20TokenBalanceController(req, res) {
  const { userAddress, contractAddress } = req.body;

  try {
    const decimals = await fetchDecimals(
      contractAddress,
      BNB_RPC_URL,
      BASE_URL,
      BSCSCAN_KEY
    );

    const response = await axios.get(
      `${BASE_URL}/api?module=account&action=tokenbalance&contractaddress=${contractAddress}&address=${userAddress}&tag=latest&apikey=${BSCSCAN_KEY}`
    );
    const balanceInWei = response.data.result;
    const balanceInEth = balanceInWei / 10 ** decimals; // Convert Wei to Ether
    console.log(`Token Balance: ${balanceInEth} ETH`);
    res.status(200).json(balanceInEth);
    return balanceInEth;
  } catch (error) {
    console.error("Error fetching Token balance:", error.message);
    return 0;
  }
}

module.exports = bep20TokenBalanceController;
