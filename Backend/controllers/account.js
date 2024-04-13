const { StatusCodes } = require("http-status-codes");
const Account = require("../models/Account");

const map = {
  USD: "USD",
  NGN: "NGN",
};

const checkAccountLimit = async (userId) => {
  const count = await Account.countDocuments({ user_id: userId });
  return count < 2;
};

const checkExistingAccount = async (userId, currency) => {
  const existingAccount = await Account.findOne({
    user_id: userId,
    currency: currency,
  });
  return existingAccount !== null;
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

module.exports = { createAccount };

// return res
// .status(StatusCodes.BAD_REQUEST)
// .json("You already have an account with this currency");

// const getUserAccounts = async (req, res) => {
//   const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
//   res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
// };

// const createAccount = async (req, res) => {
//   req.body.createdBy = req.user.userId;
//   const job = await Job.create(req.body);
//   res.status(StatusCodes.CREATED).json({ job });
// };
