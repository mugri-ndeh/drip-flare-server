import express from "express";
import { container } from "../config/inversify/inversify.ioc.config";
import SecurityCompliance from "../middlewares/security/SecurityCompliance";
import { IOC } from "../config/inversify/inversify.ioc.types";
import CommentController from "../controllers/CommentController";

const apiSecurity = container.get<SecurityCompliance>(IOC.SecurityCompliance);
const router = express.Router();
const controller = container.get<CommentController>(IOC.CommentController);

export default router;
