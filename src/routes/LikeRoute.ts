import express from "express";
import { container } from "../config/inversify/inversify.ioc.config";
import SecurityCompliance from "../middlewares/security/SecurityCompliance";
import { IOC } from "../config/inversify/inversify.ioc.types";
import LikeController from "../controllers/LikeController";

const apiSecurity = container.get<SecurityCompliance>(IOC.SecurityCompliance);
const router = express.Router();
const controller = container.get<LikeController>(IOC.LikeController);

export default router;
