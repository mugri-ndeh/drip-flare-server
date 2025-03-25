import express, { Application } from "express";
import cors from "cors";

import winston from "winston";

import { AppDataSource } from "./data_source";
import { handleException } from "./utils/ExceptionHandler";
import compression from "compression";
import swaggerDocs from "./config/swagger";

// api
import businessApis from "./routes/BusinessRoutes";
import categoryApis from "./routes/CategoryRoute";
import commentApis from "./routes/CommentRoutes";
import faqApis from "./routes/FaqRoute";
import likeApis from "./routes/LikeRoute";
import locationApis from "./routes/LocationRoute";
import measurementApis from "./routes/MeasurementRoutes";
import mediaApis from "./routes/MediaRoutes";
import notificationApis from "./routes/NotificationRoutes";
import postApis from "./routes/PostRoutes";
import reviewApis from "./routes/ReviewRoutes";
import saveApis from "./routes/SaveRoutes";
import userApis from "./routes/UserRoutes";
// import businessApis from './routes/Order';

// Middleware

const app: Application = express();

const startServer = async function () {
  await AppDataSource.initialize().then(() => console.log("DB initialized"));

  await AppDataSource.synchronize().then(() => console.log("DB synchronize"));

  app.use(express.json());

  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Host",
        "X-REAL-IP",
        "Connection",
        "Upgrade",
      ],
    })
  );

  app.use(compression());

  const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: "combined.log" }),
    ],
  });

  app.use((req, res, next) => {
    const start = Date.now();

    res.on("finish", () => {
      const duration = Date.now() - start;
      logger.info(
        `Request: ${req.method} ${req.url} - Status: ${res.statusCode} - Duration: ${duration}ms`
      );
    });

    next();
  });

  app.use("api/business", businessApis);
  app.use("api/category", categoryApis);
  app.use("api/comment", commentApis);
  app.use("api/faq", faqApis);
  app.use("api/like", likeApis);
  app.use("api/location", locationApis);
  app.use("api/measurement", measurementApis);
  app.use("api/media", mediaApis);
  app.use("api/notification", notificationApis);
  app.use("api/post", postApis);
  app.use("api/review", reviewApis);
  app.use("api/save", saveApis);
  app.use("api/user", userApis);

  swaggerDocs(app);

  app.use(handleException);

  process.on("uncaughtException", (exp) => console.error(exp.message, exp));

  const port: number = Number(process.env.PORT || 8000);

  return app.listen(port, () =>
    console.log(
      `The application started on port ${process.env.PORT}. Server ready for request.`
    )
  );
};

export const server = startServer();
