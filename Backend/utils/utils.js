const Account = require("../models/Account");

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

module.exports = { checkAccountLimit, checkExistingAccount };
