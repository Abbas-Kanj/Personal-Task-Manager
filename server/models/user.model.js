const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Board = require("./board.model");

const defaultBoard = [{ title: "Jira Project" }];

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: "FullName is required",
    unique: true,
  },
  email: {
    type: String,
    required: "email is required",
    unique: true,
  },
  password: {
    type: String,
    required: "Password is required",
  },
  boards: {
    type: [Board.schema],
    default: defaultBoard,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
