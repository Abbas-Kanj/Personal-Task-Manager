const mongoose = require("mongoose");



const defaultTasks = [
    {
      title: "create folders",
      description: "create folders for the projectt",
      tags: [],
    },
    {
      title: "finish design",
      description: "finish dedsign for nour for the projectt",
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
    // order: { type: Number },
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