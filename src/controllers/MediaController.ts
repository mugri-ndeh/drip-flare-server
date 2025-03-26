import { NextFunction, Request, Response } from "express";
import { SuccessResponse } from "../utils/success_respons";
import HttpStatus from "http-status";
import { RequestValidator } from "../utils/RequestValidator";
import { FailureResponse } from "../utils/failure_response";
import { IOC } from "../config/inversify/inversify.ioc.types";
import { inject, injectable } from "inversify";
import IMediaService from "../services/IMediaService";
import { MediaDto } from "../dto/MediaDto";
import Media from "../models/Media";
// import multer from "multer";
import path from "path";
import fs from "fs";

// Configure multer storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadDir = "uploads/media/";
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, { recursive: true });
//     }
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const ext = path.extname(file.originalname);
//     cb(null, file.fieldname + "-" + uniqueSuffix + ext);
//   },
// });

// const upload = multer({ storage });

@injectable()
export default class MediaController {
  private mediaService: IMediaService;

  constructor(@inject(IOC.IMediaService) mediaService: IMediaService) {
    this.mediaService = mediaService;
  }

  // async createMedia(
  //   request: Request,
  //   response: Response,
  //   next: NextFunction
  // ): Promise<any> {
  //   try {
  //     upload.single("file")(request, response, async (err: unknown) => {
  //       if (err) {
  //         return response
  //           .status(HttpStatus.BAD_REQUEST)
  //           .send(FailureResponse.create("File upload failed"));
  //       }

  //       const user = request.user;
  //       const file = request.file;
  //       const { type, description } = request.body;

  //       if (!file) {
  //         return response
  //           .status(HttpStatus.BAD_REQUEST)
  //           .send(FailureResponse.create("No file uploaded"));
  //       }

  //       const mediaData: MediaDto = {
  //         fileUrl: `/uploads/media/${file.filename}`,
  //         type,
  //         name: file.filename,
  //       };

  //       const { errors } = await RequestValidator(MediaDto, mediaData);
  //       if (errors) {
  //         // Clean up uploaded file if validation fails
  //         fs.unlinkSync(file.path);
  //         return response
  //           .status(HttpStatus.BAD_REQUEST)
  //           .send(FailureResponse.create(errors));
  //       }

  //       const resource = await this.mediaService.createMedia(mediaData);
  //       return response
  //         .status(HttpStatus.CREATED)
  //         .send(SuccessResponse.create(resource));
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  async getMediaById(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const mediaId = request.params.id;
      const resource = await this.mediaService.getMediaEntityById(mediaId);

      if (!resource) {
        return response
          .status(HttpStatus.NOT_FOUND)
          .send(FailureResponse.create("Media not found"));
      }

      return response
        .status(HttpStatus.OK)
        .send(SuccessResponse.create(resource));
    } catch (error) {
      next(error);
    }
  }

  async updateMedia(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const mediaId = request.params.id;
      const user = request.user;
      const { errors, input } = await RequestValidator(MediaDto, request.body);

      if (errors) {
        return response
          .status(HttpStatus.BAD_REQUEST)
          .send(FailureResponse.create(errors));
      }

      const existingMedia = await this.mediaService.geMediaByProperty({
        id: mediaId,
      });
      if (!existingMedia) {
        return response
          .status(HttpStatus.NOT_FOUND)
          .send(FailureResponse.create("Media not found"));
      }

      const resource = await this.mediaService.updateMedia(
        existingMedia,
        input
      );
      return response
        .status(HttpStatus.OK)
        .send(SuccessResponse.create(resource));
    } catch (error) {
      next(error);
    }
  }

  async deleteMedia(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const mediaId = request.params.id;
      const user = request.user;

      const existingMedia = await this.mediaService.geMediaByProperty({
        id: mediaId,
      });
      if (!existingMedia) {
        return response
          .status(HttpStatus.NOT_FOUND)
          .send(FailureResponse.create("Media not found"));
      }

      // Delete the actual file
      const filePath = path.join(process.cwd(), existingMedia.fileUrl);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      await this.mediaService.deleteMedia(existingMedia);
      return response.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  }
}
