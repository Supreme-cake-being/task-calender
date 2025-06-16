import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleSaveError, runValidatorsAtUpdate } from "./hooks.js";

const errorMessages = {
  "string.base": "{#label} must be a string",
  "string.empty": "{#label} cannot be empty",
  "any.required": "{#label} is required",
};

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Text is required"],
    },
    status: {
      type: String,
      enum: ["in progress", "done"],
      default: "in progress",
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
      validate: {
        validator: (value: any) => value > new Date(),
        message: "Due date must be in the future",
      },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

taskSchema.post("save", handleSaveError);

taskSchema.pre("findOneAndUpdate", runValidatorsAtUpdate);

taskSchema.post("findOneAndUpdate", handleSaveError);

export const taskCreateSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().valid(["in progress", "done"]),
  dueDate: Joi.date().required(),
}).messages(errorMessages);

export const blogUpdateSchema = Joi.object({
  title: Joi.string().required(),
  text: Joi.string().required(),
  status: Joi.string().valid(["in progress", "done"]),
  dueDate: Joi.date().required(),
}).messages(errorMessages);

const Task = model("task", taskSchema);

export default Task;
