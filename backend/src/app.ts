import express from "express";
import cors from "cors";
import "dotenv/config";
import taskRouter from "routes/taskRouter";
import holidayRouter from "routes/holidayRouter";
import countryRouter from "routes/countryRouter";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRouter);
app.use("/api/holidays", holidayRouter);
app.use("/api/countries", countryRouter);

app.get("/api/ping", async (_req: express.Request, res: express.Response) => {
  res.status(200).send("pong");
});

app.use((_req: express.Request, res: express.Response) => {
  res.status(404).json({ message: "Not found" });
});

app.use(
  (
    err: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    const status = err.status || 500;
    const message = err.message || "Server error";
    res.status(status).json({ message });
  }
);

export default app;
