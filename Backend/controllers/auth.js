const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const { BadRequestError } = require("../errors");

const register = async (req, res) => {
  const { email } = req.body;

  try {
    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return res.status(StatusCodes.BAD_REQUEST).json("Email already in use!");
    }

    const newUser = await User.create({ ...req.body });
    // const token = newUser.createJWT();
    const createdUser = {
      id: newUser._id,
      email: newUser.email,
      created_at: newUser.createdAt,
      updated_at: newUser.updatedAt,
    };
    res.status(StatusCodes.CREATED).json({ ...createdUser });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json("Registration failed. Please try again.");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide both email and password");
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json("Invalid email, Try again!");
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json("Invalid password, Try again!");
    }

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ token });
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json("Login failed, Try again!");
  }
};

module.exports = {
  register,
  login,
};
