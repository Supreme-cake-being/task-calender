import { RequestHandler } from "express";
import { ctrlWrapper } from "decorators";

const getTasks: RequestHandler = async (req, res) => {};

export default {
  getTasks: ctrlWrapper(getTasks),
};
