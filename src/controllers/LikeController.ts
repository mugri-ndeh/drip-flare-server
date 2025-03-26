import { NextFunction, Request, Response } from "express";

import HttpStatus from "http-status";
import { RequestValidator } from "../utils/RequestValidator";
import { FailureResponse } from "../utils/failure_response";
import { IOC } from "../config/inversify/inversify.ioc.types";
import { inject, injectable } from "inversify";
import ILikeService from "../services/ILikeService";
import { LikeDto } from "../dto/LikeDto";
import Like from "../models/Like";
import { SuccessResponse } from "../utils/success_respons";

@injectable()
export default class LikeController {
  private likeService: ILikeService;

  constructor(@inject(IOC.ILikeService) likeService: ILikeService) {
    this.likeService = likeService;
  }

  async createLike(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const user = request.user;
      const { errors, input } = await RequestValidator(LikeDto, {
        ...request.body,
        userId: user?.id,
      });

      if (errors) {
        return response
          .status(HttpStatus.BAD_REQUEST)
          .send(FailureResponse.create(errors));
      }

      // Check if like already exists
      const existingLike = await this.likeService.getLikeByProperty({
        userId: user?.id,
        itemId: input.itemId,
        type: input.type,
      });

      if (existingLike) {
        return response
          .status(HttpStatus.CONFLICT)
          .send(FailureResponse.create("Like already exists"));
      }

      const resource = await this.likeService.createLike(input);
      return response
        .status(HttpStatus.CREATED)
        .send(SuccessResponse.create(resource));
    } catch (error) {
      next(error);
    }
  }

  async getUserLikes(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const userId = request.params.userId;
      const likes = await this.likeService.getUserLikes(userId);
      return response.status(HttpStatus.OK).send(SuccessResponse.create(likes));
    } catch (error) {
      next(error);
    }
  }

  async getPostLikes(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const postId = request.params.postId;
      const likes = await this.likeService.getPosLikest(postId);
      return response.status(HttpStatus.OK).send(SuccessResponse.create(likes));
    } catch (error) {
      next(error);
    }
  }

  async getCommentLikes(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const commentId = request.params.commentId;
      const likes = await this.likeService.getCommentLikes(commentId);
      return response.status(HttpStatus.OK).send(SuccessResponse.create(likes));
    } catch (error) {
      next(error);
    }
  }

  async deleteLike(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const likeId = request.params.id;
      const user = request.user;

      const existingLike = await this.likeService.getLikeByProperty({
        id: likeId,
      });
      if (!existingLike) {
        return response
          .status(HttpStatus.NOT_FOUND)
          .send(FailureResponse.create("Like not found"));
      }

      if (existingLike.userId !== user?.id) {
        return response
          .status(HttpStatus.FORBIDDEN)
          .send(FailureResponse.create("You can only delete your own likes"));
      }

      await this.likeService.deleteLike(existingLike);
      return response.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  }
}
