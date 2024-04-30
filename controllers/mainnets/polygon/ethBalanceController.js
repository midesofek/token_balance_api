const axios = require("axios");
require("dotenv").config();

const POLYGONSCAN_KEY = process.env.POLYGONSCAN_API_KEY;

// Function to fetch MATIC balance
async function maticBalanceController(req, res) {
  const userAddress = req.params.userAddress;

  try {
    const response = await axios.get(
      `https://api.polygonscan.io/api?module=account&action=balance&address=${userAddress}&tag=latest&apikey=${POLYGONSCAN_KEY}`
    );
    const balanceInWei = response.data.result;
    const balanceInEth = balanceInWei / 1e18; // Convert Wei to Ether
    console.log(`MATIC Balance: ${balanceInEth} MATIC`);
    res.status(200).json(`MATIC Balance: ${balanceInEth} MATIC`);
    return balanceInEth;
  } catch (error) {
    console.error("Error fetching MATIC balance:", error.message);
    return 0;
  }
}

module.exports = maticBalanceController;
