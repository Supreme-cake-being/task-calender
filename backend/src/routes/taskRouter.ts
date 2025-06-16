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
taskRouter.get("/:taskId", isValidId("taskId"), taskController.getTasks);

taskRouter.post(
  "/",
  isEmptyBody,
  taskCreateValidation,
  taskController.getTasks
);

taskRouter.delete("/:taskId", isValidId("taskId"), taskController.getTasks);

taskRouter.put(
  "/:taskId",
  isValidId("taskId"),
  isEmptyBody,
  taskUpdateValidation,
  taskController.getTasks
);

export default taskRouter;
