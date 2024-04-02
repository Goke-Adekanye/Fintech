const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const register = async (req, res) => {
  const { email, phoneNo } = req.body;

  try {
    const emailExists = await User.findOne({ email });
    const phoneExists = await User.findOne({ phoneNo });

    if (emailExists) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "Email is already in use. Please choose a different email." });
    }

    if (phoneExists) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "Phone number is already registered. Please use a different phone number." });
    }

    const newUser = await User.create({ ...req.body });
    const token = newUser.createJWT();
    res.status(StatusCodes.CREATED).json({ user: { name: newUser.name }, token });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: "Registration failed. Please try again." });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please provide both email and password');
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new UnauthenticatedError('Invalid email or password');
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      throw new UnauthenticatedError('Invalid email or password');
    }

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({ error: "Login failed. Please check your credentials and try again." });
  }
};

module.exports = {
  register,
  login,
};