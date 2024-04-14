const { StatusCodes } = require("http-status-codes");
const Account = require("../models/Account");
const {
  checkAccountLimit,
  checkExistingAccount,
  transferTx,
} = require("../utils/utils");

const map = {
  USD: "USD",
  NGN: "NGN",
};

const createAccount = async (req, res) => {
  req.body.user_id = req.user.userId;

  const { currency } = req.body;

  if (!currency || !map[currency]) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please provide a valid currency" });
  }

  if (!(await checkAccountLimit(req.user.userId))) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Account limit exceeded" });
  }

  if (await checkExistingAccount(req.user.userId, currency)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "You already have an account with this currency" });
  }

  try {
    const account = await Account.create(req.body);
    res.status(StatusCodes.CREATED).json({ account });
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "You already have an account with this currency" });
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "An error occurred while creating the account" });
  }
};

const getUserAccounts = async (req, res) => {
  const userId = req.user.userId;

  try {
    const accounts = await Account.find({ user_id: userId });
    res.status(StatusCodes.OK).json(accounts);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

const transferFund = async (req, res) => {
  const userId = req.user.userId;
  const tr = req.body;

  try {
    const fromAccount = await Account.findById(tr.from_account_id);
    if (!fromAccount) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Invalid Account" });
    }

    if (fromAccount.user_id.toString() !== userId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Invalid Accounts" });
    }

    const toAccount = await Account.findById(tr.to_account_id);
    if (!toAccount) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Recipient Account Not Found" });
    }

    if (toAccount.currency !== fromAccount.currency) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Account Currencies Mismatch" });
    }

    if (fromAccount.balance < tr.amount) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Insufficient balance" });
    }

    const response = await transferTx(tr);
    res.status(StatusCodes.CREATED).json(response);
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Encountered issue with transaction" });
  }
};

module.exports = { createAccount, getUserAccounts, transferFund };
