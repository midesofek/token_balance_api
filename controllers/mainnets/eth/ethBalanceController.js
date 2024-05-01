const axios = require("axios");
require("dotenv").config();

const ETHERSCAN_KEY = process.env.ETHERSCAN_API_KEY;

// Function to fetch ETH balance
async function ethBalanceController(req, res) {
  const { userAddress } = req.body;

  try {
    const response = await axios.get(
      `https://api.etherscan.io/api?module=account&action=balance&address=${userAddress}&tag=latest&apikey=${ETHERSCAN_KEY}`
    );
    const balanceInWei = response.data.result;
    const balanceInEth = balanceInWei / 1e18; // Convert Wei to Ether
    console.log(`ETH Balance: ${balanceInEth} ETH`);
    res.status(200).json(balanceInEth);
    return balanceInEth;
  } catch (error) {
    console.error("Error fetching ETH balance:", error.message);
    return 0;
  }
}

module.exports = ethBalanceController;
