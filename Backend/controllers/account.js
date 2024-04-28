const { StatusCodes } = require("http-status-codes");
const Account = require("../models/Account");
const MoneyRecord = require("../models/MoneyRecord");
const Entry = require("../models/Entry");
const {
  checkAccountLimit,
  checkExistingAccount,
  transferTx,
  validateRequestBody,
} = require("../utils/utils");
const Joi = require("joi");

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

const usernameSchema = Joi.object({
  to_account_id: Joi.string().required(),
  amount: Joi.number().required(),
  reference: Joi.string().required(),
});

// Define Add-money function
const addMoney = async (req, res) => {
  try {
    // Validate the request body
    const validationError = validateRequestBody(usernameSchema, req.body);
    if (validationError) {
      return res.status(StatusCodes.BAD_REQUEST).json(validationError);
    }

    const userId = req.user.userId;
    const { to_account_id, amount, reference, status } = req.body;

    const account = await Account.findById(to_account_id);
    if (!account) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Account not found" });
    }

    if (account.user_id.toString() !== userId) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Unauthorized operation" });
    }

    const moneyRecordArgs = {
      user_id: account.user_id,
      reference,
      status,
      amount,
    };

    await MoneyRecord.create(moneyRecordArgs);

    const entryArgs = { account_id: account._id, amount };
    await Entry.create(entryArgs);

    await Account.findByIdAndUpdate(account._id, { $inc: { balance: amount } });
    res.status(StatusCodes.OK).json({ message: "Updated account balance" });
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Record with reference already exists" });
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: err.message });
    }
  }
};

module.exports = { createAccount, getUserAccounts, transferFund, addMoney };
