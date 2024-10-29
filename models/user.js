const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Your name is  required"],
  },
  email: {
    type: String,
    required: [true, "Your email is requuired"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.createHash = async function (plainTextPassword) {
  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(plainTextPassword, salt);
  return hashedPassword;
};

userSchema.methods.validatePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
