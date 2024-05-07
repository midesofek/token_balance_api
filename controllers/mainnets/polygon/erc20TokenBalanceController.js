const axios = require("axios");
const fetchDecimals = require("../../../utils/utils");
require("dotenv").config();

// polygon ERC20 tokens //

const { POLYGONSCAN_API_KEY: POLYGONSCAN_KEY, POLYGON_RPC_URL } = process.env;
const BASE_URL = "https://api.polygonscan.com";

// Function to fetch any ERC20 token balance on Polygon using its ContractAddress
async function erc20TokenBalanceController(req, res) {
  const { userAddress, contractAddress } = req.body;

  try {
    const decimals = await fetchDecimals(
      contractAddress,
      POLYGON_RPC_URL,
      BASE_URL,
      POLYGONSCAN_KEY
    );

    const response = await axios.get(
      `${BASE_URL}/api?module=account&action=tokenbalance&contractaddress=${contractAddress}&address=${userAddress}&tag=latest&apikey=${POLYGONSCAN_KEY}`
    );
    const balanceInWei = response.data.result;
    console.log("BIW: ", balanceInWei);
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
