import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import cors from 'cors';
import "express-async-errors";

import routes from "./routes/index";
import uploadConfig from "@config/upload";
import AppError from "@shared/errors/AppError";

import "@shared/infra/typeorm";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/files", express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
});

const PORT = process.env.APP_PORT || 3333;

app.listen(PORT, () => {
  console.log(`🚀  Server started at port:${PORT}`);
});
