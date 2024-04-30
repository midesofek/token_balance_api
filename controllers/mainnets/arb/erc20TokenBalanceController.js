const axios = require("axios");
require("dotenv").config();

// arbitrum ERC20 tokens //

const ARBISCAN_KEY = process.env.ARBISCAN_API_KEY;

// Function to fetch any ERC20 token on ARB balance using its ContractAddress
async function erc20TokenBalanceController(req, res) {
  const { userAddress, contractAddress } = req.body;

  try {
    const response = await axios.get(
      `https://api.arbiscan.io/api?module=account&action=tokenbalance&contractaddress=${contractAddress}&address=${userAddress}&tag=latest&apikey=${ARBISCAN_KEY}`
    );
    const balanceInWei = response.data.result;
    const balanceInEth = balanceInWei / 1e18; // Convert Wei to Ether
    console.log(`Token Balance: ${balanceInEth}`);
    res.status(200).json(balanceInEth);
    return balanceInEth;
  } catch (error) {
    console.error("Error fetching ETH balance:", error.message);
    return 0;
  }
}

module.exports = erc20TokenBalanceController;
