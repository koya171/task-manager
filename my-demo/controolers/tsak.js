const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require('../errors/custom-error')
const getAlltasks = asyncWrapper(async (req, res) => {
  const Tasks = await Task.find({});
  res.status(200).json({ Tasks });
});

const Createtask =asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body);
    res.status(201).json({task});
});

const gettask = asyncWrapper(async (req, res,next) => {
  const { id } = req.params;
    const task = await Task.findOne({ _id: id });
    if (!task) {
      return next(createCustomError(`No task with id : ${id}`, 404));
    }
  res.status(200).json({ task });
});

const Updatetask = asyncWrapper(async (req, res,next) => {
  const { id } = req.params;
    const task = await Task.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return next(createCustomError(`No task with id : ${id}`, 404))
    }
    res.status(200).json({task});
});
const Deletetask = asyncWrapper(async (req, res,next) => {
  const { id } = req.params;
    const task = await Task.findOneAndDelete({ _id: id });
    if (!task) {
      return next(createCustomError(`No task with id : ${id}`, 404))
    }
  res.status(200).json({ task });
});

module.exports = {
  getAlltasks,
  Createtask,
  gettask,
  Updatetask,
  Deletetask,
};

