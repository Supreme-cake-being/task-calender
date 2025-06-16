import Joi from "joi";

export const holidayQuerySchema = Joi.object({
  year: Joi.number().min(1975).required(),
  countryCode: Joi.string().required(),
});
