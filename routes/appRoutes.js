const express = require("express");
const router = express.Router();

//////// MAINNET ROUTES ////////
const ethBalanceController = require("../controllers/mainnets/eth/ethBalanceController");
const erc20BalanceController = require("../controllers/mainnets/eth/erc20TokenBalanceController");

const maticBalanceController = require("../controllers/mainnets/polygon/maticBalanceController");
const maticErc20BalanceController = require("../controllers/mainnets/polygon/erc20TokenBalanceController");

const bnbBalanceController = require("../controllers/mainnets/bsc/bnbBalanceController");
const bep20BalanceController = require("../controllers/mainnets/bsc/bep20TokenBalanceController");

const arbEthBalanceController = require("../controllers/mainnets/arb/ethBalanceController");
const arbErc20BalanceController = require("../controllers/mainnets/arb/erc20TokenBalanceController");

const baseEthBalanceController = require("../controllers/mainnets/base/ethBalanceController");
const baseErc20BalanceController = require("../controllers/mainnets/base/erc20TokenBalanceController");

////////////////////////////////////

//////// TESTNET ROUTES ////////
const sepEthBalanceController = require("../controllers/testnets/ethBalanceController");
const sepErc20TokenBalanceController = require("../controllers/testnets/erc20TokenBalanceController");

function greeter(req, res) {
  res.status(200).json("Hello There!");
}
////////////////////////////////////

//// Handle Mainnet Route ////
// ETH MAINNET ROUTE
router.route("/eth").post(ethBalanceController);
router.route("/erc20").post(erc20BalanceController);

// POLYGON MAINNET ROUTE
router.route("/matic").post(maticBalanceController);
router.route("/matic-erc20").post(maticErc20BalanceController);

// BSC MAINNET ROUTE
router.route("/bnb").post(bnbBalanceController);
router.route("/bep20").post(bep20BalanceController);

// ARB MAINNET ROUTE
router.route("/arb-eth").post(arbEthBalanceController);
router.route("/arb-erc20").post(arbErc20BalanceController);

// BASE MAINNET ROUTE
router.route("/base-eth").post(baseEthBalanceController);
router.route("/base-erc20").post(baseErc20BalanceController);

//// Handle Testnet Route ////
router.route("/").get(greeter);
router.route("/sepolia-eth/:userAddress").post(sepEthBalanceController);
router
  .route("/sepolia-erc20/:contractAddress/:userAddress")
  .get(sepErc20TokenBalanceController);

// export router
module.exports = router;
