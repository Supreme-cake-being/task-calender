import { RequestHandler } from "express";
import { ctrlWrapper } from "decorators";
import Task from "models/Task";
import { HttpError } from "helpers";

const getTasks: RequestHandler = async (req, res) => {
  const { year } = req.query;

  if (!year || isNaN(Number(year))) {
    throw HttpError(400, "Invalid or missing 'year' query parameter");
  }

  const start = new Date(`${year}-01-01T00:00:00.000Z`);
  const end = new Date(`${+year + 1}-01-01T00:00:00.000Z`);

  const tasks = await Task.find({
    dueDate: {
      $gte: start,
      $lt: end,
    },
  });
  res.json(tasks);
};

const getTaskById: RequestHandler = async (req, res) => {
  const { taskId } = req.params;

  const task = await Task.findById(taskId);
  if (!task) {
    throw HttpError(404, "Not found");
  }

  res.json(task);
};

const createTask: RequestHandler = async (req, res) => {
  const { title, description, status, dueDate } = req.body;

  const task = await Task.create({
    title,
    description,
    status,
    dueDate,
  });

  res.status(201).json(task);
};

const deleteTask: RequestHandler = async (req, res) => {
  const { taskId } = req.params;

  const task = await Task.findById(taskId);

  if (!task) {
    throw HttpError(404, "Not found");
  }

  await Task.findByIdAndDelete(taskId);

  res.json({ message: "Task deleted" });
};

const updateTask: RequestHandler = async (req, res) => {
  const { taskId } = req.params;
  const { title, description, status, dueDate } = req.body;

  const task = await Task.findById(taskId);

  if (!task) {
    throw HttpError(404, "Not found");
  }

  const updatedTask = await Task.findByIdAndUpdate(taskId, {
    title,
    description,
    status,
    dueDate,
  });

  res.json(updatedTask);
};

export default {
  getTasks: ctrlWrapper(getTasks),
  getTaskById: ctrlWrapper(getTaskById),
  createTask: ctrlWrapper(createTask),
  deleteTask: ctrlWrapper(deleteTask),
  updateTask: ctrlWrapper(updateTask),
};
