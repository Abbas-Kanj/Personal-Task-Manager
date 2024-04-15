const User = require("../models/user.model");

const getAllTasks = async (req, res) => {
  try {
    return res.status(200).json(req.user?.tasks);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};
const getTask = (req, res) => {
  const { id } = req.params;
  try {
    const task = req.user?.tasks?.find((task) => task._id === id);
    if (!task) return res.status(404).send("task not found");
    return res.status(200).json(task);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};
const addTask = async (req, res) => {
  const user = req.user;
  try {
    user.tasks.push(req.body);
    const updatedUser = await user.save();
    return res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};
const editTask = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: { "tasks.$[elem]": req.body },
      },
      { new: true, arrayFilters: [{ "elem._id": id }] }
    );
    
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};
const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: { "tasks.$._id": id },
      },
      { new: true }
    );
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};

module.exports = {
  getAllTasks,
  getTask,
  addTask,
  editTask,
  deleteTask,
};
