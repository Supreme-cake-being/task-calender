import { RequestHandler } from "express";
import { ctrlWrapper } from "decorators";
import { HttpError } from "helpers";

const getCountries: RequestHandler = async (_req, res) => {
  const response = await fetch(
    process.env.DATE_NAGER_API + `/AvailableCountries`
  );
  if (!response.ok) {
    throw HttpError(400, "Bad request");
  }

  const countries = await response.json();
  res.json(countries);
};

export default {
  getCountries: ctrlWrapper(getCountries),
};
