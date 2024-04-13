const { StatusCodes } = require("http-status-codes");
const Account = require("../models/Account");
const { checkAccountLimit, checkExistingAccount } = require("../utils/utils");

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

module.exports = { createAccount, getUserAccounts };
