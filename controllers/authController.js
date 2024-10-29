const User = require("../models/user");
const createSecretToken = require("../utiils/SecretToken");

const signUp = async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    const newUser = new User({
      name,
      email,
      isAdmin,
    });

    let hashedPassword = await newUser.createHash(password);
    newUser.password = hashedPassword;

    await newUser.save();

    const token = createSecretToken(newUser._id);

    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    res
      .status(200)
      .json({ message: "User signed up successfully", success: true, newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create user", error });
  }
};

const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      return res.json({ message: "Incorrect password or email" });
    }

    let auth = await user.validatePassword(password, user.password);

    if (!auth) {
      return res.json({ message: "Incorrect email and password" });
    }

    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json(
      {
        message: "Invalid email/password",
      },
      error
    );
  }
};

module.exports = { signUp, logIn };
