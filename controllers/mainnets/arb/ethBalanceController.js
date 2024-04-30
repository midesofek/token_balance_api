const axios = require("axios");
require("dotenv").config();

// arbitrum ETH //

const ARBISCAN_KEY = process.env.ARBISCAN_API_KEY;

// Function to fetch ETH balance on ARB
async function ethBalanceController(req, res) {
  const { userAddress } = req.body;
  try {
    const response = await axios.get(
      `https://api.arbiscan.io/api?module=account&action=balance&address=${userAddress}&tag=latest&apikey=${ARBISCAN_KEY}`
    );
    const balanceInWei = response.data.result;
    const balanceInEth = balanceInWei / 1e18; // Convert Wei to Ether
    console.log(`ARB ETH Balance: ${balanceInEth} ETH`);
    res.status(200).json(`ARB ETH Balance: ${balanceInEth} ETH`);
    return balanceInEth;
  } catch (error) {
    console.error("Error fetching ETH balance:", error.message);
    return 0;
  }
}

module.exports = ethBalanceController;
