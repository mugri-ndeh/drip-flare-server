import express from "express";
import { container } from "../config/inversify/inversify.ioc.config";
import SecurityCompliance from "../middlewares/security/SecurityCompliance";
import { IOC } from "../config/inversify/inversify.ioc.types";
import SaveController from "../controllers/SaveController";

const apiSecurity = container.get<SecurityCompliance>(IOC.SecurityCompliance);
const router = express.Router();
const controller = container.get<SaveController>(IOC.SaveController);

/**
 * @swagger
 * tags:
 *   name: Saves
 *   description: Save management endpoints
 */

/**
 * @swagger
 * /save:
 *   post:
 *     summary: Save a post
 *     tags: [Saves]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SaveDto'
 *           example:
 *             userId: "123e4567-e89b-12d3-a456-426614174000"
 *             postId: "123e4567-e89b-12d3-a456-426614174001"
 *     responses:
 *       201:
 *         description: Post saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SaveDto'
 *       400:
 *         description: Validation error or already saved
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/",
  apiSecurity.authCompliance.bind(apiSecurity),
  controller.createSave.bind(controller)
);

/**
 * @swagger
 * /save/user/{userId}:
 *   get:
 *     summary: Get all saves by a user
 *     tags: [Saves]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of user's saved posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SaveDto'
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/user/:userId",
  apiSecurity.authCompliance.bind(apiSecurity),
  controller.getUserSaves.bind(controller)
);

/**
 * @swagger
 * /save/post/{postId}:
 *   get:
 *     summary: Get all saves for a post
 *     tags: [Saves]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of post's saves
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SaveDto'
 */
router.get("/post/:postId", controller.getPostSaves.bind(controller));

/**
 * @swagger
 * /save/{id}:
 *   delete:
 *     summary: Unsave a post
 *     tags: [Saves]
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
 *         description: Post unsaved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not save owner)
 *       404:
 *         description: Save not found
 */
router.delete(
  "/:id",
  apiSecurity.authCompliance.bind(apiSecurity),
  controller.deleteSave.bind(controller)
);

export default router;
