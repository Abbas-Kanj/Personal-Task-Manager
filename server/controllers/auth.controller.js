const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(500).send("Username already exists!");

    const createdUser = await User.create(req.body);
    return res.status(201).json({ user: createdUser });
  } catch (error) {
    console.log(error);
    return res.send(500).send(error);
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("email/password incorrect!");

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).send("email/password incorrect!");

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    const loggedUser = await User.findOne({ email }).select("-password -boards");
    return res.status(200).json({ loggedUser, token });
  } catch (error) {
    console.log(error);
    return res.send(500).send("Internal server error!");
  }
};

module.exports = {
  register,
  login,
};
