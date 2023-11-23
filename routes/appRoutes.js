const express = require("express");
const router = express.Router();

const ethBalanceController = require("../controllers/ethBalanceController");
const erc20TokenBalanceController = require("../controllers/erc20TokenBalanceController");

function greeter(req, res) {
  res.status(200).json("Hello There!");
}

// handle route
router.route("/").get(greeter);
router.route("/sepolia-eth/:userAddress").post(ethBalanceController);
router
  .route("/sepolia-erc20/:contractAddress/:userAddress")
  .get(erc20TokenBalanceController);

// export router
module.exports = router;
