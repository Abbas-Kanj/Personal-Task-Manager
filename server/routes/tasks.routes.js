const express = require("express");
const isAuthenticated = require("../middlewares/auth.middleware");
const taskController = require("../controllers/tasks.controller");
const router = express.Router();

router.get("/", isAuthenticated, taskController.getAllTasks);
router.get("/:id", isAuthenticated, taskController.getTask);
router.post("/", isAuthenticated, taskController.addTask);
router.put("/:taskid", isAuthenticated, taskController.editTask);
router.delete("/:taskid", isAuthenticated, taskController.deleteTask);
module.exports = router;
