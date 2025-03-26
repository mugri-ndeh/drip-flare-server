import express from "express";
import { container } from "../config/inversify/inversify.ioc.config";
import SecurityCompliance from "../middlewares/security/SecurityCompliance";
import { IOC } from "../config/inversify/inversify.ioc.types";
import MeasurementController from "../controllers/MeasurementController";

const apiSecurity = container.get<SecurityCompliance>(IOC.SecurityCompliance);
const router = express.Router();
const controller = container.get<MeasurementController>(
  IOC.MeasurementController
);

/**
 * @swagger
 * tags:
 *   name: Measurements
 *   description: User body measurement management
 */

/**
 * @swagger
 * /measurement:
 *   post:
 *     summary: Create or update user measurements
 *     tags: [Measurements]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MeasurementDto'
 *           example:
 *             height: 175
 *             chestCircumference: 95
 *             waistCircumference: 80
 *             hipCircumference: 100
 *             shoulderWidth: 45
 *             sleeveLength: 60
 *             inseam: 80
 *             trouserlength: 100
 *             size: "M"
 *             footWearSize: "42"
 *     responses:
 *       201:
 *         description: Measurements created/updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MeasurementDto'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/",
  apiSecurity.authCompliance.bind(apiSecurity),
  controller.createOrUpdateMeasurement.bind(controller)
);

/**
 * @swagger
 * /measurement/me:
 *   get:
 *     summary: Get current user's measurements
 *     tags: [Measurements]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User measurements
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MeasurementDto'
 *       404:
 *         description: Measurements not found
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/me",
  apiSecurity.authCompliance.bind(apiSecurity),
  controller.getMyMeasurement.bind(controller)
);

/**
 * @swagger
 * /measurement/{id}:
 *   delete:
 *     summary: Delete user measurements
 *     tags: [Measurements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Measurements deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not measurement owner)
 *       404:
 *         description: Measurements not found
 */
router.delete(
  "/:id",
  apiSecurity.authCompliance.bind(apiSecurity),
  controller.deleteMeasurement.bind(controller)
);

export default router;
