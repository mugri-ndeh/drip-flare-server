import { NextFunction, Request, Response } from "express";

import HttpStatus from "http-status";
import { RequestValidator } from "../utils/RequestValidator";
import { FailureResponse } from "../utils/failure_response";
import { IOC } from "../config/inversify/inversify.ioc.types";
import { inject, injectable } from "inversify";
import ICommentService from "../services/ICommentService";
import { CommentDto } from "../dto/CommentDto";
import AppComment from "../models/Comment";
import { SuccessResponse } from "../utils/success_respons";

@injectable()
export default class CommentController {
  private commentService: ICommentService;

  constructor(@inject(IOC.ICommentService) commentService: ICommentService) {
    this.commentService = commentService;
  }

  async createComment(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const user = request.user;
      const { errors, input } = await RequestValidator(CommentDto, {
        ...request.body,
        userId: user?.id,
      });

      if (errors) {
        return response
          .status(HttpStatus.BAD_REQUEST)
          .send(FailureResponse.create(errors));
      }

      const resource = await this.commentService.createComment(input);
      return response
        .status(HttpStatus.CREATED)
        .send(SuccessResponse.create(resource));
    } catch (error) {
      next(error);
    }
  }

  async getUserComments(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const userId = request.params.userId;
      const comments = await this.commentService.getUserComments(userId);
      return response
        .status(HttpStatus.OK)
        .send(SuccessResponse.create(comments));
    } catch (error) {
      next(error);
    }
  }

  async getPostComments(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const postId = request.params.postId;
      const comments = await this.commentService.getPostComments(postId);
      return response
        .status(HttpStatus.OK)
        .send(SuccessResponse.create(comments));
    } catch (error) {
      next(error);
    }
  }

  async updateComment(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const commentId = request.params.id;
      const user = request.user;
      const { errors, input } = await RequestValidator(
        CommentDto,
        request.body
      );

      if (errors) {
        return response
          .status(HttpStatus.BAD_REQUEST)
          .send(FailureResponse.create(errors));
      }

      const existingComment = await this.commentService.getCommentByProperty({
        id: commentId,
      });
      if (!existingComment) {
        return response
          .status(HttpStatus.NOT_FOUND)
          .send(FailureResponse.create("Comment not found"));
      }

      if (existingComment.userId !== user?.id) {
        return response
          .status(HttpStatus.FORBIDDEN)
          .send(
            FailureResponse.create("You can only update your own comments")
          );
      }

      const resource = await this.commentService.updateComment(
        existingComment,
        input
      );
      return response
        .status(HttpStatus.OK)
        .send(SuccessResponse.create(resource));
    } catch (error) {
      next(error);
    }
  }

  async deleteComment(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const commentId = request.params.id;
      const user = request.user;

      const existingComment = await this.commentService.getCommentByProperty({
        id: commentId,
      });
      if (!existingComment) {
        return response
          .status(HttpStatus.NOT_FOUND)
          .send(FailureResponse.create("Comment not found"));
      }

      if (existingComment.userId !== user?.id) {
        return response
          .status(HttpStatus.FORBIDDEN)
          .send(
            FailureResponse.create("You can only delete your own comments")
          );
      }

      await this.commentService.deleteComment(existingComment);
      return response.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  }
}
