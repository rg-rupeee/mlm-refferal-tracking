const express = require("express");
const router = express.Router();

const viewController = require("./../controller/viewController");

router.route("/").get(viewController.getIndex);

router.route("/user-details").get(viewController.getUserDetails);

router.route("/add-credit").get(viewController.getAddCredit);

router.route("/add-user").get(viewController.getAddUser);

module.exports = router;
