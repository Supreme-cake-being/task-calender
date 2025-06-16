import express from "express";
import taskController from "controllers/taskController";

const taskRouter = express.Router();

taskRouter.get("/tasks", taskController.getTasks);

export default taskRouter;
