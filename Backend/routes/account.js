const express = require("express");

const router = express.Router();
const { createAccount, getUserAccounts } = require("../controllers/account");

router.route("/create").post(createAccount);
router.route("/").get(getUserAccounts);

module.exports = router;
