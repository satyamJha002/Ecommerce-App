const User = require("../models/user");

const signUp = async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;

    const newUser = new User({
      name,
      email,
      isAdmin,
    });

    let hashedPassword = await newUser.createHash(password);
    newUser.password = hashedPassword;

    await newUser.save();

    res.status(200).json({ message: "User created successfully", newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create user", error });
  }
};

const logIn = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (user === null) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    if (await user.validatePassword(req.body.password)) {
      return res.status(200).json({
        message: "User login successfully",
        user,
      });
    } else {
      return res.status(400).json({
        message: "Incorrect Password",
      });
    }
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
