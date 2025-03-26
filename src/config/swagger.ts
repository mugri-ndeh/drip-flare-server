import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Request, Response } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Dripfare API",
      version: "1.0.0",
      description: "API documentation for dripfare",
    },
    servers: [
      {
        url: "http://localhost:3005/api",
        description: "Development server",
      },
    ],
    security: [
      {
        BearerAuth: [], // Apply globally (optional)
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        BusinessDto: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
            name: { type: "string" },
            phoneNumber: { type: "string" },
            address: { type: "string" },
            accountName: { type: "string" },
            accountNumber: { type: "string" },
            bankName: { type: "string" },
            idNumber: { type: "string" },
            bvn: { type: "string" },
            type: { type: "string", enum: ["laundry", "designer"] },
            userId: { type: "string" },
          },
        },

        CategoryDto: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
            name: { type: "string" },
          },
        },

        AppCommentDto: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
            comment: { type: "string" },
            userId: { type: "string" },
            postId: { type: "string" },
          },
        },

        FaqDto: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
            question: { type: "string" },
            answer: { type: "string" },
          },
        },

        LikeDto: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
            type: { type: "string", enum: ["comment", "post"] },
            userId: { type: "string" },
            itemId: { type: "string" },
          },
        },

        AppLocationDto: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
            country: { type: "string" },
            streetName: { type: "string" },
            buildingNumber: { type: "string" },
            others: { type: "string" },
            latitute: { type: "number", format: "float" },
            longitude: { type: "number", format: "float" },
            userId: { type: "string" },
          },
        },

        MeasurementDto: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
            height: { type: "integer" },
            chestCircumference: { type: "integer" },
            waistCircumference: { type: "integer" },
            hipCircumference: { type: "integer" },
            shoulderWidth: { type: "integer" },
            sleeveLength: { type: "integer" },
            inseam: { type: "integer" },
            trouserlength: { type: "integer" },
            size: { type: "string" },
            footWearSize: { type: "string" },
            userId: { type: "string" },
          },
        },

        AppNotificationDto: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
            title: { type: "string" },
            message: { type: "string" },
            deviceToken: { type: "string" },
            type: {
              type: "string",
              enum: ["save", "comment", "follow", "bid", "request", "other"],
            },
            userId: { type: "string" },
          },
        },

        PostDto: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
            designCode: { type: "string" },
            mediaUrl: { type: "string" },
            actions: {
              type: "array",
              items: { type: "string" },
            },
            description: { type: "string" },
            cost: { type: "string" },
            rentDeposit: { type: "string", nullable: true },
            listedRegisteredSize: { type: "string" },
            businessId: { type: "string" },
          },
        },

        ReviewDto: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
            review: { type: "string" },
            rating: { type: "number", format: "float" },
            userId: { type: "string" },
            businessId: { type: "string" },
          },
        },

        SaveDto: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
            userId: { type: "string" },
            postId: { type: "string" },
          },
        },

        UserDto: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
            email: { type: "string" },
            fullName: { type: "string" },
            password: { type: "string" },
            profileLink: { type: "string" },
            profilePictureUrl: { type: "string" },
            bio: { type: "string" },
            interests: {
              type: "array",
              items: { type: "string" },
            },
            deviceTokens: {
              type: "array",
              items: { type: "string" },
            },
            authMethods: {
              type: "array",
              items: { type: "string" },
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"], // Path to your route files
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app: any) => {
  // Swagger UI
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON format
  app.get("/api-docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log(`Swagger docs available at http://localhost:3005/api-docs`);
};

export default swaggerDocs;
