import express from "express";
import { container } from "../config/inversify/inversify.ioc.config";
import SecurityCompliance from "../middlewares/security/SecurityCompliance";
import { IOC } from "../config/inversify/inversify.ioc.types";
import BusinessController from "../controllers/BusinessController";

const apiSecurity = container.get<SecurityCompliance>(IOC.SecurityCompliance);
const router = express.Router();
const controller = container.get<BusinessController>(IOC.BusinessController);

/**
 * @swagger
 * tags:
 *   name: Business
 *   description: Business management endpoints
 */

/**
 * @swagger
 * /business:
 *   post:
 *     summary: Create a new business
 *     tags: [Business]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BusinessDto'
 *           example:
 *             name: "Fashion House"
 *             phoneNumber: "+2348123456789"
 *             address: "123 Fashion Street, Lagos"
 *             accountName: "John Doe"
 *             accountNumber: "0123456789"
 *             bankName: "Fashion Bank"
 *             type: "designer"
 *     responses:
 *       201:
 *         description: Business created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BusinessDto'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/",
  apiSecurity.authCompliance.bind(apiSecurity),
  controller.createBusiness.bind(controller)
);

/**
 * @swagger
 * /business/me:
 *   get:
 *     summary: Get the authenticated user's business
 *     tags: [Business]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Business details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BusinessDto'
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Business not found
 *       500:
 *         description: Internal server error
 */
router.get(
  "/me",
  apiSecurity.authCompliance.bind(apiSecurity),
  controller.getMyBusiness.bind(controller)
);

/**
 * @swagger
 * /business/{id}:
 *   put:
 *     summary: Update a business
 *     tags: [Business]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BusinessDto'
 *     responses:
 *       200:
 *         description: Business updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not business owner)
 *       404:
 *         description: Business not found
 */
router.put(
  "/:id",
  apiSecurity.authCompliance.bind(apiSecurity),
  controller.updateBusiness.bind(controller)
);

/**
 * @swagger
 * /business/{id}:
 *   delete:
 *     summary: Delete a business (must be owner)
 *     tags: [Business]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Business ID
 *     responses:
 *       204:
 *         description: Business deleted successfully
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Forbidden (not the owner)
 *       404:
 *         description: Business not found
 *       500:
 *         description: Internal server error
 */
router.delete(
  "/:id",
  apiSecurity.authCompliance.bind(apiSecurity),
  controller.deleteBusiness.bind(controller)
);

export default router;
