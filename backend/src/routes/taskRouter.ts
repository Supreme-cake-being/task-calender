import express from "express";
import taskController from "controllers/taskController";
import {
  isEmptyBody,
  isValidId,
  taskCreateValidation,
  taskQueryValidation,
  taskUpdateValidation,
} from "middlewares";

const taskRouter = express.Router();

taskRouter.get("/", taskQueryValidation, taskController.getTasks);
taskRouter.get("/:taskId", isValidId("taskId"), taskController.getTaskById);

taskRouter.post(
  "/",
  isEmptyBody,
  taskCreateValidation,
  taskController.createTask
);

taskRouter.delete("/:taskId", isValidId("taskId"), taskController.deleteTask);

taskRouter.put(
  "/:taskId",
  isValidId("taskId"),
  isEmptyBody,
  taskUpdateValidation,
  taskController.updateTask
);

export default taskRouter;
