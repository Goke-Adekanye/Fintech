const Account = require("../models/Account");
const Transfer = require("../models/Transfer");
const Entry = require("../models/Entry");

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

const transferTx = async (tr) => {
  let tx = {};

  try {
    tx.transfer = await Transfer.create(tr);

    tx.to_account = await Account.findByIdAndUpdate(
      tr.to_account_id,
      { $inc: { balance: tr.amount } },
      { new: true }
    );

    tx.from_account = await Account.findByIdAndUpdate(
      tr.from_account_id,
      { $inc: { balance: -1 * tr.amount } },
      { new: true }
    );

    tx.entry_in = await Entry.create({
      account_id: tr.to_account_id,
      amount: tr.amount,
    });

    tx.entry_out = await Entry.create({
      account_id: tr.from_account_id,
      amount: -1 * tr.amount,
    });

    return tx;
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Encountered issue with transaction" });
  }
};

module.exports = { checkAccountLimit, checkExistingAccount, transferTx };
