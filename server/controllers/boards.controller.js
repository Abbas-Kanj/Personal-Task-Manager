const User = require("../models/user.model");
const Board = require("../models/board.model");

const getAllBoards = async (req, res) => {
  try {
    return res.status(200).json(req.user.boards);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};

const getBoard = (req, res) => {
  const { id } = req.params;
  try {
    const board = req.user?.boards?.find((board) => board._id === id);
    if (!board) return res.status(404).send("board not found");
    return res.status(200).json(board);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};

const addBoard = async (req, res) => {
  const user = req.user;
  try {
    user.boards?.push(req.body);
    const updatedUser = await user.save();
    return res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};
const editBoard = async (req, res) => {
  try {
    const userId = req.user._id;
    const boardId = req.params.boardid;
    const title = req.body.title
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId, 'boards._id': boardId }, 
      { $set: { 'boards.$': { _id: boardId, title } } }, 
      { new: true } 
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User or board not found" });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};

const deleteBoard = async (req, res) => {
  try {
    const userId = req.user._id;
    const boardId = req.params.boardid;
    console.log(boardId);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { boards: { _id: boardId } } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User or board not found" });
    }

    res.json({
      message: "Board deleted successfully",
      board: updatedUser.boards,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addColumn = async (req, res) => {
  const board = req.board;
  try {
    board.columns.push(req.body);
    const updatedboard = await board.save();
    return res.status(200).json({ board: updatedboard });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};

module.exports = {
  getAllBoards,
  getBoard,
  addBoard,
  editBoard,
  deleteBoard,
  addColumn,
};
