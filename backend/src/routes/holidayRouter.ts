import express from "express";
import holidayController from "controllers/holidayController";
import { holidayQueryValidation } from "middlewares";

const holidayRouter = express.Router();

holidayRouter.get("/", holidayQueryValidation, holidayController.getHolidays);

export default holidayRouter;
