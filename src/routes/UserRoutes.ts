import express from "express";
import { container } from "../config/inversify/inversify.ioc.config";
import SecurityCompliance from "../middlewares/security/SecurityCompliance";
import { IOC } from "../config/inversify/inversify.ioc.types";
import UserController from "../controllers/UserController";

const apiSecurity = container.get<SecurityCompliance>(IOC.SecurityCompliance);
const router = express.Router();
const controller = container.get<UserController>(IOC.UserController);

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *         password:
 *           type: string
 *           format: password
 *           description: User's password (must be a strong password)
 *
 *     UserRegistrationRequest:
 *       type: object
 *       required:
 *         - email
 *         - firstName
 *         - lastName
 *         - password
 *         - homeCountry
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *         firstName:
 *           type: string
 *           description: User's first name
 *         lastName:
 *           type: string
 *           description: User's last name
 *         password:
 *           type: string
 *           format: password
 *           description: User's password (must be a strong password)
 *         homeCountry:
 *           type: string
 *           description: User's home country
 *
 *     RefreshTokenRequest:
 *       type: object
 *       required:
 *         - refreshToken
 *       properties:
 *         refreshToken:
 *           type: string
 *           description: Existing refresh token to obtain new access tokens
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *           examples:
 *             loginExample:
 *               value:
 *                 email: "chrome@gmail.com"
 *                 password: "StrongP@ssword123!"
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   description: Login response with access and refresh tokens
 *       400:
 *         description: Bad request, validation errors
 *       401:
 *         description: Invalid credentials
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.post("/login", controller.login.bind(controller));

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: User registration
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegistrationRequest'
 *           examples:
 *             registrationExample:
 *               value:
 *                 email: "newuser@example.com"
 *                 password: "StrongP@ssword123!"
 *                 fullName: "Dtp"
 *     responses:
 *       201:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   description: Registered user details with access and refresh tokens
 *       400:
 *         description: Bad request, validation errors
 *       409:
 *         description: User already exists
 *       500:
 *         description: Internal server error
 */
router.post("/register", controller.registerUser.bind(controller));

/**
 * @swagger
 * /auth/user/update/{userId}:
 *   put:
 *     summary: Update user profile
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegistrationRequest'
 *           examples:
 *             updateExample:
 *               value:
 *                 email: "updated@example.com"
 *                 firstName: "Jane"
 *                 lastName: "Smith"
 *                 password: "NewStrongP@ssword456!"
 *                 homeCountry: "Canada"
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *       400:
 *         description: Bad request, validation errors
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.put(
  "/user/update/:userId",
  apiSecurity.authCompliance.bind(apiSecurity),
  controller.updateUser.bind(controller)
);

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Refresh authentication token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefreshTokenRequest'
 *           examples:
 *             refreshExample:
 *               value:
 *                 refreshToken: "your.refresh.token"
 *     responses:
 *       200:
 *         description: Tokens refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   description: New access and refresh tokens
 *       400:
 *         description: Bad request, validation errors
 *       401:
 *         description: Invalid refresh token
 *       500:
 *         description: Internal server error
 */
router.post("/refresh-token", controller.refreshToken.bind(controller));

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get authenticated user profile
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/UserRegistrationRequest'
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */
router.get(
  "/me",
  apiSecurity.authCompliance.bind(apiSecurity),
  controller.getAuthenticatedUser.bind(controller)
);

export default router;
