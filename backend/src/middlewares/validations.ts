import { validateQuery } from "decorators";
import { holidayQuerySchema } from "models/Holiday";

export const holidayQueryValidation = validateQuery(holidayQuerySchema);
