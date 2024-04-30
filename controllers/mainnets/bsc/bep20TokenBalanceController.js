const axios = require("axios");
require("dotenv").config();

const BSCSCAN_KEY = process.env.BSCSCAN_API_KEY;

// Function to fetch any BEP20 token balance using its ContractAddress
async function bep20TokenBalanceController(req, res) {
  const { userAddress, contractAddress } = req.body;

  try {
    const response = await axios.get(
      `https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=${contractAddress}&address=${userAddress}&tag=latest&apikey=${BSCSCAN_KEY}`
    );
    const balanceInWei = response.data.result;
    const balanceInEth = balanceInWei / 1e18; // Convert Wei to Ether
    console.log(`Token Balance: ${balanceInEth} ETH`);
    res.status(200).json(balanceInEth);
    return balanceInEth;
  } catch (error) {
    console.error("Error fetching Token balance:", error.message);
    return 0;
  }
}

module.exports = bep20TokenBalanceController;
