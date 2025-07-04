import express from "express";
import countryController from "controllers/countryController";

const countryRouter = express.Router();

countryRouter.get("/", countryController.getCountries);

export default countryRouter;
