import express from "express";
import { container } from "../config/inversify/inversify.ioc.config";
import SecurityCompliance from "../middlewares/security/SecurityCompliance";
import { IOC } from "../config/inversify/inversify.ioc.types";
import LocationController from "../controllers/LocationController";

const apiSecurity = container.get<SecurityCompliance>(IOC.SecurityCompliance);
const router = express.Router();
const controller = container.get<LocationController>(IOC.LocationController);

/**
 * @swagger
 * tags:
 *   name: Locations
 *   description: Location management endpoints
 */

/**
 * @swagger
 * /location:
 *   post:
 *     summary: Create or update user location
 *     tags: [Locations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AppLocationDto'
 *           example:
 *             country: "Nigeria"
 *             streetName: "Main Street"
 *             buildingNumber: "123"
 *             others: "Apartment 4B"
 *             latitude: 6.5244
 *             longitude: 3.3792
 *     responses:
 *       201:
 *         description: Location created/updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AppLocationDto'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/",
  apiSecurity.authCompliance.bind(apiSecurity),
  controller.createOrUpdateLocation.bind(controller)
);

/**
 * @swagger
 * /location/me:
 *   get:
 *     summary: Get current user's location
 *     tags: [Locations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User location details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AppLocationDto'
 *       404:
 *         description: Location not found
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/me",
  apiSecurity.authCompliance.bind(apiSecurity),
  controller.getMyLocation.bind(controller)
);

/**
 * @swagger
 * /location/{id}:
 *   delete:
 *     summary: Delete a location
 *     tags: [Locations]
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
 *         description: Location deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not location owner)
 *       404:
 *         description: Location not found
 */
router.delete(
  "/:id",
  apiSecurity.authCompliance.bind(apiSecurity),
  controller.deleteLocation.bind(controller)
);

export default router;
