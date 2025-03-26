import { NextFunction, Request, Response } from "express";
import { SuccessResponse } from "../utils/success_respons";
import HttpStatus from "http-status";
import { RequestValidator } from "../utils/RequestValidator";
import { FailureResponse } from "../utils/failure_response";
import { IOC } from "../config/inversify/inversify.ioc.types";
import { inject, injectable } from "inversify";
import IPostService from "../services/IPostService";
import { PostDto } from "../dto/PostDto";
import Post from "../models/Post";

@injectable()
export default class PostController {
  private postService: IPostService;

  constructor(@inject(IOC.IPostService) postService: IPostService) {
    this.postService = postService;
  }

  async createPost(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const user = request.user;
      const { errors, input } = await RequestValidator(PostDto, {
        ...request.body,
        userId: user?.id,
      });

      if (errors) {
        return response
          .status(HttpStatus.BAD_REQUEST)
          .send(FailureResponse.create(errors));
      }

      const resource = await this.postService.createPost(input);
      return response
        .status(HttpStatus.CREATED)
        .send(SuccessResponse.create(resource));
    } catch (error) {
      next(error);
    }
  }

  async updatePost(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const postId = request.params.id;
      const user = request.user;
      const { errors, input } = await RequestValidator(PostDto, request.body);

      if (errors) {
        return response
          .status(HttpStatus.BAD_REQUEST)
          .send(FailureResponse.create(errors));
      }

      const existingPost = await this.postService.getPostByProperty({
        id: postId,
      });
      if (!existingPost) {
        return response
          .status(HttpStatus.NOT_FOUND)
          .send(FailureResponse.create("Post not found"));
      }

      const resource = await this.postService.updatePost(existingPost, input);
      return response
        .status(HttpStatus.OK)
        .send(SuccessResponse.create(resource));
    } catch (error) {
      next(error);
    }
  }

  async getPostsByUser(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const userId = request.params.userId;
      const posts = await this.postService.getPostByUser(userId);
      return response.status(HttpStatus.OK).send(SuccessResponse.create(posts));
    } catch (error) {
      next(error);
    }
  }

  async getPostsByBusiness(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const businessId = request.params.businessId;
      const posts = await this.postService.getPostByBusiness(businessId);
      return response.status(HttpStatus.OK).send(SuccessResponse.create(posts));
    } catch (error) {
      next(error);
    }
  }

  async getAllPosts(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const posts = await this.postService.getAllPosts();
      return response.status(HttpStatus.OK).send(SuccessResponse.create(posts));
    } catch (error) {
      next(error);
    }
  }

  async deletePost(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const postId = request.params.id;
      const user = request.user;

      const existingPost = await this.postService.getPostByProperty({
        id: postId,
      });
      if (!existingPost) {
        return response
          .status(HttpStatus.NOT_FOUND)
          .send(FailureResponse.create("Post not found"));
      }

      await this.postService.deletePost(existingPost);
      return response.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  }
}
