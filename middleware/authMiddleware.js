const User = require("../models/user");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const userVerification = (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({ status: false });
  }

  jwt.verify(token, process.env.SECRET_KEY, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    } else {
      const user = await User.findById(data.id);
      if (user) return res.json({ status: true, user: user.name });
      else return res.json({ status: false });
    }
  });
};

module.exports = userVerification;
