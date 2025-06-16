import { validateQuery } from "decorators";
import { holidayQuerySchema } from "models/Holiday";
import {
  taskCreateSchema,
  taskQuerySchema,
  taskUpdateSchema,
} from "models/Task";

export const holidayQueryValidation = validateQuery(holidayQuerySchema);

export const taskQueryValidation = validateQuery(taskQuerySchema);
export const taskCreateValidation = validateQuery(taskCreateSchema);
export const taskUpdateValidation = validateQuery(taskUpdateSchema);
