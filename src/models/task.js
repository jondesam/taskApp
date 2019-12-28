const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true, trim: true },
  completed: { type: Boolean, default: false }
});

taskSchema.pre("save", async function(next) {
  const task = this;

  if (task.isModified("password")) {
    task.password = await bcrypt.hash(user.password, 8);
  }

  console.log("Just before saving in task");
  next();
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
