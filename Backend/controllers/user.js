const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");

const getLoggedInUser = async (req, res) => {
  const userId = req.user.userId;

  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Not authorized to access resources" });
    }

    res.status(StatusCodes.OK).json(user);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

const updateUsername = async (req, res) => {
  const userId = req.user.userId;

  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { username },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(500).json({ error: "Error updating username" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

module.exports = {
  getLoggedInUser,
  updateUsername,
};
