import express from "express";
import { container } from "../config/inversify/inversify.ioc.config";
import SecurityCompliance from "../middlewares/security/SecurityCompliance";
import { IOC } from "../config/inversify/inversify.ioc.types";
import FaqController from "../controllers/FaqController";

const apiSecurity = container.get<SecurityCompliance>(IOC.SecurityCompliance);
const router = express.Router();
const controller = container.get<FaqController>(IOC.FaqController);

export default router;
