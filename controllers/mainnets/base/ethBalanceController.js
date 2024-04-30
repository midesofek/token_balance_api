const axios = require("axios");
require("dotenv").config();

// BASE ETH BALANCE//

const BASESCAN_KEY = process.env.BASESCAN_API_KEY;

// Function to fetch ETH balance on ARB
async function ethBalanceController(req, res) {
  const { userAddress } = req.body;

  try {
    const response = await axios.get(
      `https://api.basescan.org/api?module=account&action=balance&address=${userAddress}&tag=latest&apikey=${BASESCAN_KEY}`
    );
    const balanceInWei = response.data.result;
    const balanceInEth = balanceInWei / 1e18; // Convert Wei to Ether
    console.log(`BASE ETH Balance: ${balanceInEth} ETH`);
    res.status(200).json(`BASE ETH Balance: ${balanceInEth} ETH`);
    return balanceInEth;
  } catch (error) {
    console.error("Error fetching BASE ETH balance:", error.message);
    return 0;
  }
}

module.exports = ethBalanceController;
