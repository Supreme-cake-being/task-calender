import { RequestHandler } from "express";
import { ctrlWrapper } from "decorators";
import { HttpError } from "helpers";

const getHolidays: RequestHandler = async (req, res) => {
  const { year, countryCode } = req.query;

  const response = await fetch(
    process.env.DATE_NAGER_API + `/PublicHolidays/${year}/${countryCode}`
  );
  if (!response.ok) {
    throw HttpError(400, "Bad request");
  }

  const holidays = await response.json();
  res.json(holidays);
};

export default {
  getHolidays: ctrlWrapper(getHolidays),
};
