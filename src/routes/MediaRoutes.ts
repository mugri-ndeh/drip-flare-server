import express from "express";
import { container } from "../config/inversify/inversify.ioc.config";
import SecurityCompliance from "../middlewares/security/SecurityCompliance";
import { IOC } from "../config/inversify/inversify.ioc.types";
import MediaController from "../controllers/MediaController";

const apiSecurity = container.get<SecurityCompliance>(IOC.SecurityCompliance);
const router = express.Router();
const controller = container.get<MediaController>(IOC.MediaController);

/**
 * @swagger
 * tags:
 *   name: Media
 *   description: Media file management
 */

// /**
//  * @swagger
//  * /media:
//  *   post:
//  *     summary: Upload new media
//  *     tags: [Media]
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         multipart/form-data:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               file:
//  *                 type: string
//  *                 format: binary
//  *               type:
//  *                 type: string
//  *                 enum: [image, video, document]
//  *               description:
//  *                 type: string
//  *     responses:
//  *       201:
//  *         description: Media uploaded successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/MediaDto'
//  *       400:
//  *         description: Invalid file or validation error
//  *       401:
//  *         description: Unauthorized
//  */
// router.post(
//   "/",
//   apiSecurity.authCompliance.bind(apiSecurity),
//   controller.createMedia.bind(controller)
// );

/**
 * @swagger
 * /media/{id}:
 *   get:
 *     summary: Get media by ID
 *     tags: [Media]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Media details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MediaDto'
 *       404:
 *         description: Media not found
 */
router.get("/:id", controller.getMediaById.bind(controller));

/**
 * @swagger
 * /media/{id}:
 *   put:
 *     summary: Update media metadata
 *     tags: [Media]
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
 *             $ref: '#/components/schemas/MediaDto'
 *     responses:
 *       200:
 *         description: Media updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Media not found
 */
router.put(
  "/:id",
  apiSecurity.authCompliance.bind(apiSecurity),
  controller.updateMedia.bind(controller)
);

/**
 * @swagger
 * /media/{id}:
 *   delete:
 *     summary: Delete media
 *     tags: [Media]
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
 *         description: Media deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Media not found
 */
router.delete(
  "/:id",
  apiSecurity.authCompliance.bind(apiSecurity),
  controller.deleteMedia.bind(controller)
);

export default router;
