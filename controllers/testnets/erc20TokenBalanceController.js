const axios = require("axios");
require("dotenv").config();

const ETHERSCAN_KEY = process.env.ETHERSCAN_API_KEY;

// Function to fetch any ERC20 token balance using its ContractAddress
async function erc20TokenBalanceController(req, res) {
  const contractAddress = req.params.contractAddress;
  const userAddress = req.params.userAddress;

  try {
    const response = await axios.get(
      `https://api-sepolia.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${contractAddress}&address=${userAddress}&tag=latest&apikey=${ETHERSCAN_KEY}`
    );
    const balanceInWei = response.data.result;
    const balanceInEth = balanceInWei / 1e18; // Convert Wei to Ether
    console.log(`Token Balance: ${balanceInEth} ETH`);
    res.status(200).json(balanceInEth);
    return balanceInEth;
  } catch (error) {
    console.error("Error fetching ETH balance:", error.message);
    return 0;
  }
}

module.exports = erc20TokenBalanceController;
