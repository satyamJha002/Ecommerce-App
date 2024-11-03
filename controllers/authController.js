const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

const signUp = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Fill all required fields" });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res
      .status(404)
      .json({ success: false, message: "User already created same email" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (newUser) {
    return res.status(200).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      token: generateToken(newUser._id),
    });
  } else {
    return res
      .status(400)
      .json({ success: false, message: "Invalid User Data" });
  }
});

const logIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  const comparePswd = await bcrypt.compare(password, user.password);

  const token = generateToken(user._id);
  user.token = token;

  if (user && comparePswd) {
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    return res
      .status(400)
      .json({ success: false, message: "Invalid credentials" });
  }
});

const getUser = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);

  res.status(200).json({
    id: _id,
    name,
    email,
  });
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: "10d",
  });
};

module.exports = { signUp, logIn, getUser };
