const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

const createSecretToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};

module.exports = createSecretToken;
