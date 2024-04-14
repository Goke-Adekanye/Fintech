const express = require("express");

const router = express.Router();
const {
  createAccount,
  getUserAccounts,
  transferFund,
} = require("../controllers/account");

router.route("/create").post(createAccount);
router.route("/").get(getUserAccounts);
router.route("/transfer").post(transferFund);

module.exports = router;
