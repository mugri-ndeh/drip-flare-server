import express from "express";
import { container } from "../config/inversify/inversify.ioc.config";
import SecurityCompliance from "../middlewares/security/SecurityCompliance";
import { IOC } from "../config/inversify/inversify.ioc.types";
import PostController from "../controllers/PostController";

const apiSecurity = container.get<SecurityCompliance>(IOC.SecurityCompliance);
const router = express.Router();
const controller = container.get<PostController>(IOC.PostController);

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Post management endpoints
 */

/**
 * @swagger
 * /post:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostDto'
 *           example:
 *             designCode: "DES-2023-001"
 *             mediaUrl: "https://example.com/image.jpg"
 *             description: "New summer collection"
 *             cost: "150.00"
 *             businessId: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       201:
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostDto'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/",
  apiSecurity.authCompliance.bind(apiSecurity),
  controller.createPost.bind(controller)
);

/**
 * @swagger
 * /post/{id}:
 *   put:
 *     summary: Update a post
 *     tags: [Posts]
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
 *             $ref: '#/components/schemas/PostDto'
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not post owner)
 *       404:
 *         description: Post not found
 */
router.put(
  "/:id",
  apiSecurity.authCompliance.bind(apiSecurity),
  controller.updatePost.bind(controller)
);

/**
 * @swagger
 * /post:
 *   get:
 *     summary: Get All posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: List of business's posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PostDto'
 *       404:
 *         description: Business not found
 */
router.get("/", controller.getPostsByBusiness.bind(controller));

/**
 * @swagger
 * /post/user/{userId}:
 *   get:
 *     summary: Get posts by user
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of user's posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PostDto'
 *       404:
 *         description: User not found
 */
router.get("/user/:userId", controller.getPostsByUser.bind(controller));

/**
 * @swagger
 * /post/business/{businessId}:
 *   get:
 *     summary: Get posts by business
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: businessId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of business's posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PostDto'
 *       404:
 *         description: Business not found
 */
router.get(
  "/business/:businessId",
  controller.getPostsByBusiness.bind(controller)
);

/**
 * @swagger
 * /post/{id}:
 *   delete:
 *     summary: Delete a post
 *     tags: [Posts]
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
 *         description: Post deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not post owner)
 *       404:
 *         description: Post not found
 */
router.delete(
  "/:id",
  apiSecurity.authCompliance.bind(apiSecurity),
  controller.deletePost.bind(controller)
);

export default router;
