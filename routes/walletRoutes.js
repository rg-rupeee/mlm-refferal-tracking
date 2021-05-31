const express = require("express");
const router = express.Router();

const walletController = require("./../controller/walletController");

router.route("/").get(walletController.getAllWallets);

router.route("/:userId").get(walletController.getWalletById);

router.route("/credit/:userId").patch(walletController.addCredit);

module.exports = router;