const axios = require("axios");
require("dotenv").config();

const BSCSCAN_KEY = process.env.BSCSCAN_API_KEY;

// Function to fetch BNB balance on BSC
async function bnbBalanceController(req, res) {
  const userAddress = req.params.userAddress;

  try {
    const response = await axios.get(
      `https://api.bscscan.io/api?module=account&action=balance&address=${userAddress}&tag=latest&apikey=${BSCSCAN_KEY}`
    );
    const balanceInWei = response.data.result;
    const balanceInEth = balanceInWei / 1e18; // Convert Wei to Ether
    console.log(`BNB Balance: ${balanceInEth} BNB`);
    res.status(200).json(`BNB Balance: ${balanceInEth} BNB`);
    return balanceInEth;
  } catch (error) {
    console.error("Error fetching BNB balance:", error.message);
    return 0;
  }
}

module.exports = bnbBalanceController;
