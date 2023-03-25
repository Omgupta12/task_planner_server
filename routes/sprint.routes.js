const express = require("express");
const SprintModel = require("../model/sprints.model");
const app = express.Router();

// Create a Sprint
app.post("/", async (req, res) => {
  const { sprintName, startDate, endDate } = req.body;

  try {
    const sprint = await SprintModel.create({ sprintName, startDate, endDate });
    return res.status(201).json(sprint);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
});

// Add a task to a Sprint
app.post("/:id/tasks", async (req, res) => {
  const { type, description, assignee, status } = req.body;
  const sprintId = req.params.id;

  try {
    const sprint = await SprintModel.findById(sprintId);
    sprint.tasks.push({ type, description, assignee, status });
    await sprint.save();
    res.status(201).json(sprint);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Update a task's assignee or status
app.put("/:id/tasks/:taskid", async (req, res) => {
  const { assignee, status } = req.body;
  const sprintId = req.params.id;
  const taskId = req.params.taskid;

  try {
    const sprint = await SprintModel.findById(sprintId);
    const task = sprint.tasks.id(taskId);
    task.assignee = assignee || task.assignee;
    task.status = status || task.status;
    await sprint.save();
    res.status(200).json(sprint);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all tasks of a particular Sprint
app.get("/:id/tasks", async (req, res) => {
  const sprintId = req.params.id;

  try {
    const sprint = await SprintModel.findById(sprintId);
    res.status(200).json(sprint.tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all tasks assigned to a user
app.get("/:assignee", async (req, res) => {
  const assignee = req.params.assignee;

  try {
    const sprints = await SprintModel.find({ "tasks.assignee": assignee });
    const tasks = sprints.flatMap((sprint) =>
      sprint.tasks.filter((task) => task.assignee === assignee)
    );
    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = app;
