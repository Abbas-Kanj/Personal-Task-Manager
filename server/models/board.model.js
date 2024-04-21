const mongoose = require("mongoose");

const defaultTasks = [
  {
    title: "setup enviroment",
    description: "structure folders correctly",
    tags: [],
  },
  {
    title: "revise material",
    description: "review the material needed for the final project",
    tags: [],
  },
];

const defaultColumns = [
  { title: "OPEN", tasks: defaultTasks },
  { title: "IN_PROGRESS", tasks: [] },
  { title: "DONE", tasks: [] },
];

const tagschema = {
  title: String,
  color: String,
};

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  tags: {
    type: [tagschema],
    default: [],
  },
});
const columnSchema = new mongoose.Schema({
  title: String,
  tasks: {
    type: [taskSchema],
    default: defaultTasks,
  },
});

const boardSchema = new mongoose.Schema({
  title: String,
  columns: {
    type: [columnSchema],
    default: defaultColumns,
  },
});

const Board = mongoose.model("Board", boardSchema);

module.exports = Board;
