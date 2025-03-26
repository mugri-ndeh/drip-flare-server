import express from "express";
import { container } from "../config/inversify/inversify.ioc.config";
import SecurityCompliance from "../middlewares/security/SecurityCompliance";
import { IOC } from "../config/inversify/inversify.ioc.types";
import LikeController from "../controllers/LikeController";

const apiSecurity = container.get<SecurityCompliance>(IOC.SecurityCompliance);
const router = express.Router();
const controller = container.get<LikeController>(IOC.LikeController);

/**
 * @swagger
 * tags:
 *   name: Likes
 *   description: Like management endpoints
 */

/**
 * @swagger
 * /like:
 *   post:
 *     summary: Create a new like
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LikeDto'
 *           example:
 *             type: "post"
 *             userId: "123e4567-e89b-12d3-a456-426614174000"
 *             itemId: "123e4567-e89b-12d3-a456-426614174001"
 *     responses:
 *       201:
 *         description: Like created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LikeDto'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/",
  apiSecurity.authCompliance.bind(apiSecurity),
  controller.createLike.bind(controller)
);

/**
 * @swagger
 * /like/user/{userId}:
 *   get:
 *     summary: Get all likes by a user
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of user's likes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LikeDto'
 */
router.get("/user/:userId", controller.getUserLikes.bind(controller));

/**
 * @swagger
 * /like/post/{postId}:
 *   get:
 *     summary: Get all likes on a post
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of post's likes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LikeDto'
 */
router.get("/post/:postId", controller.getPostLikes.bind(controller));

/**
 * @swagger
 * /like/comment/{commentId}:
 *   get:
 *     summary: Get all likes on a comment
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of comment's likes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LikeDto'
 */
router.get("/comment/:commentId", controller.getCommentLikes.bind(controller));

/**
 * @swagger
 * /like/{id}:
 *   delete:
 *     summary: Delete a like
 *     tags: [Likes]
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
 *         description: Like deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not like owner)
 *       404:
 *         description: Like not found
 */
router.delete(
  "/:id",
  apiSecurity.authCompliance.bind(apiSecurity),
  controller.deleteLike.bind(controller)
);

export default router;
