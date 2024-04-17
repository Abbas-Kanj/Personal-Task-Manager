const Board = require("../models/board.model");
const User = require("../models/user.model");

const getAllTasks = async (req, res) => {
  try {
    const userId = req.user;
    const boardId = req.params.boardid;

    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found");

    const board = user.boards.find((board) => board._id.toString() === boardId); // Find board by ID
    if (!board) return res.status(404).send("Board not found");

    return res.status(200).json(board.columns.map((column) => column.tasks));
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

const addTask = async (req, res) => {
  try {
    const userId = req.user;
    const boardId = req.params.boardid;
    const defaultColumnId = "661d4742fcb9d94f4b4fe3e7"; 
    const { title, description } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found");

    const board = user.boards.find((board) => board._id.toString() === boardId);
    if (!board) return res.status(404).send("Board not found");

    const column = board.columns.find(
      (column) => column._id.toString() === defaultColumnId
    );

    if (!column) {
      return res.status(400).send("Default column not found in this board");
    }
    column.tasks.push({ title, description });
    const updatedUser = await user.save();
    return res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

const editTask = async (req, res) => {
  const { boardId, columnId, taskId } = req.params;
  const { title, description, tags } = req.body;
  try {
    const board = await Board.findById(boardId);
    if (!board) return res.status(404).send("Board not found");

    const column = board.columns.find((column) => column._id === columnId);
    if (!column) return res.status(404).send("Column not found");

    const task = column.tasks.find((task) => task._id === taskId);
    if (!task) return res.status(404).send("Task not found");

    task.title = title;
    task.description = description;
    task.tags = tags;

    const updatedBoard = await board.save();

    return res.status(200).json({ board: updatedBoard });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

const deleteTask = async (req, res) => {
  const { boardId, columnId, taskId } = req.params;
  try {
    const board = await Board.findById(boardId);
    if (!board) return res.status(404).send("Board not found");

    const column = board.columns.find((column) => column._id === columnId);
    if (!column) return res.status(404).send("Column not found");

    const taskIndex = column.tasks.findIndex((task) => task._id === taskId);
    if (taskIndex === -1) return res.status(404).send("Task not found");

    column.tasks.splice(taskIndex, 1);
    const updatedBoard = await board.save();

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

module.exports = {
  getAllTasks,
  addTask,
  editTask,
  deleteTask,
};
