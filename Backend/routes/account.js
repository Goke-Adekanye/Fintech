const express = require("express");

const router = express.Router();
const {
  createAccount,
  getUserAccounts,
  transferFund,
  addMoney,
} = require("../controllers/account");

router.route("/create").post(createAccount);
router.route("/").get(getUserAccounts);
router.route("/transfer").post(transferFund);
router.route("/add-money").post(addMoney);

module.exports = router;
