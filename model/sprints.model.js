const { default: mongoose } = require("mongoose");

const SprintSchema = new mongoose.Schema({
  sprintName: String,
  startDate: Date,
  endDate: Date,
  tasks: [
    {
      type: { type: String, enum: ["bug", "feature", "story"] },
      description: String,
      assignee: String,
      status: { type: String, enum: ["to-do", "in-progress", "done"] },
    },
  ],
});

const SprintModel = mongoose.model("sprint", SprintSchema);

module.exports = SprintModel;
