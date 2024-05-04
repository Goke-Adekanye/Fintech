const express = require("express");

const router = express.Router();
const {
  createAccount,
  getUserAccounts,
  transferFund,
  addMoney,
  getAccountByAccountNumber,
} = require("../controllers/account");

router.route("/create").post(createAccount);
router.route("/").get(getUserAccounts);
router.route("/transfer").post(transferFund);
router.route("/add-money").post(addMoney);
router.route("/get-account-by-number").post(getAccountByAccountNumber);

module.exports = router;
