import { NextFunction, Request, Response } from "express";
import { SuccessResponse } from "../utils/success_respons";
import HttpStatus from "http-status";
import { RequestValidator } from "../utils/RequestValidator";
import { FailureResponse } from "../utils/failure_response";
import { IOC } from "../config/inversify/inversify.ioc.types";
import { inject, injectable } from "inversify";
import ISaveService from "../services/ISaveService";
import { SaveDto } from "../dto/SaveDto";
import Save from "../models/Save";

@injectable()
export default class SaveController {
  private saveService: ISaveService;

  constructor(@inject(IOC.ISaveService) saveService: ISaveService) {
    this.saveService = saveService;
  }

  async createSave(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const user = request.user;
      const { errors, input } = await RequestValidator(SaveDto, {
        ...request.body,
        userId: user?.id,
      });

      if (errors) {
        return response
          .status(HttpStatus.BAD_REQUEST)
          .send(FailureResponse.create(errors));
      }

      // Check if already saved
      const existingSave = await this.saveService.geSaveByProperty({
        userId: user?.id,
        postId: input.postId,
      });

      if (existingSave) {
        return response
          .status(HttpStatus.BAD_REQUEST)
          .send(FailureResponse.create("Post already saved"));
      }

      const resource = await this.saveService.createSave(input);
      return response
        .status(HttpStatus.CREATED)
        .send(SuccessResponse.create(resource));
    } catch (error) {
      next(error);
    }
  }

  async getUserSaves(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const userId = request.params.userId;
      const requestUser = request.user;

      // Users can only view their own saves
      if (userId !== requestUser?.id) {
        return response
          .status(HttpStatus.FORBIDDEN)
          .send(FailureResponse.create("You can only view your own saves"));
      }

      const saves = await this.saveService.getAllUserSaves(userId);
      return response.status(HttpStatus.OK).send(SuccessResponse.create(saves));
    } catch (error) {
      next(error);
    }
  }

  async getPostSaves(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const postId = request.params.postId;
      const saves = await this.saveService.getAllPostSaves(postId);
      return response.status(HttpStatus.OK).send(SuccessResponse.create(saves));
    } catch (error) {
      next(error);
    }
  }

  async deleteSave(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const saveId = request.params.id;
      const user = request.user;

      const existingSave = await this.saveService.getSaveEntityById(saveId);
      if (!existingSave) {
        return response
          .status(HttpStatus.NOT_FOUND)
          .send(FailureResponse.create("Save not found"));
      }

      if (existingSave.userId !== user?.id) {
        return response
          .status(HttpStatus.FORBIDDEN)
          .send(FailureResponse.create("You can only delete your own saves"));
      }

      await this.saveService.deleteSave(existingSave);
      return response.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  }
}
