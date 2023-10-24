import { AppDataSource } from "./data-source";
import express, {
  Express,
  NextFunction,
  Request,
  Response,
  json,
  urlencoded,
} from "express";
import "dotenv/config";
import cors from "cors";
import cookieparser from "cookie-parser";

import parentRouter from "./routes/parents.route";
import studentRouter from "./routes/students.route";
import authRouter from "./routes/auth.route";
import AppError from "./utils/appError";

AppDataSource.initialize()
  .then(async () => {
    const app: Express = express();
    const port = process.env.PORT || 5000;

    app.use(cors());
    app.use(json());
    app.use(urlencoded({ extended: false }));
    app.use(cookieparser());

    // routes
    app.use("/api/parents", parentRouter);
    app.use("/api/students", studentRouter);
    app.use("/api/auth", authRouter);

    app.get("/", (req: Request, res: Response) => {
      res.send("Wecode Backend");
    });

    app.all("*", (req: Request, res: Response, next: NextFunction) => {
      next(new AppError(404, `Route ${req.originalUrl} not found`));
    });

    app.use(
      (error: AppError, req: Request, res: Response, next: NextFunction) => {
        error.status = error.status || "error";
        error.statusCode = error.statusCode || 500;

        res.status(error.statusCode).json({
          status: error.status,
          message: error.message,
        });
      }
    );

    app.listen(port, () => {
      console.log(`⚡[server]: Server started successfully on PORT: ${port}`);
    });
  })
  .catch((error) => console.log(error));
