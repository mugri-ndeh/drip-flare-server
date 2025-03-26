import express from "express";
import { container } from "../config/inversify/inversify.ioc.config";
import SecurityCompliance from "../middlewares/security/SecurityCompliance";
import { IOC } from "../config/inversify/inversify.ioc.types";
import FaqController from "../controllers/FaqController";

const apiSecurity = container.get<SecurityCompliance>(IOC.SecurityCompliance);
const router = express.Router();
const controller = container.get<FaqController>(IOC.FaqController);

/**
 * @swagger
 * tags:
 *   name: FAQs
 *   description: Frequently Asked Questions management
 */

/**
 * @swagger
 * /faq:
 *   get:
 *     summary: Get all FAQs
 *     tags: [FAQs]
 *     responses:
 *       200:
 *         description: List of all FAQs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FaqDto'
 */
router.get("/", controller.getFaqs.bind(controller));

/**
 * @swagger
 * /faq:
 *   post:
 *     summary: Create a new FAQ
 *     tags: [FAQs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FaqDto'
 *           example:
 *             question: "How do I reset my password?"
 *             answer: "You can reset your password using the forgot password link."
 *     responses:
 *       201:
 *         description: FAQ created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FaqDto'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/",
  apiSecurity.authCompliance.bind(apiSecurity),
  controller.createFaq.bind(controller)
);

/**
 * @swagger
 * /faq/{id}:
 *   put:
 *     summary: Update an FAQ
 *     tags: [FAQs]
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
 *             $ref: '#/components/schemas/FaqDto'
 *     responses:
 *       200:
 *         description: FAQ updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: FAQ not found
 */
router.put(
  "/:id",
  apiSecurity.authCompliance.bind(apiSecurity),
  controller.updateFaq.bind(controller)
);

/**
 * @swagger
 * /faq/{id}:
 *   delete:
 *     summary: Delete an FAQ
 *     tags: [FAQs]
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
 *         description: FAQ deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: FAQ not found
 */
router.delete(
  "/:id",
  apiSecurity.authCompliance.bind(apiSecurity),
  controller.deleteFaq.bind(controller)
);

export default router;
