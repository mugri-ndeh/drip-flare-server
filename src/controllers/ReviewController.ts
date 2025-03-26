import { NextFunction, Request, Response } from "express";
import { SuccessResponse } from "../utils/success_respons";
import HttpStatus from "http-status";
import { RequestValidator } from "../utils/RequestValidator";
import { FailureResponse } from "../utils/failure_response";
import { IOC } from "../config/inversify/inversify.ioc.types";
import { inject, injectable } from "inversify";
import IReviewService from "../services/IReviewService";
import { ReviewDto } from "../dto/ReviewDto";
import Review from "../models/Review";

@injectable()
export default class ReviewController {
  private reviewService: IReviewService;

  constructor(@inject(IOC.IReviewService) reviewService: IReviewService) {
    this.reviewService = reviewService;
  }

  async createReview(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const user = request.user;
      const { errors, input } = await RequestValidator(ReviewDto, {
        ...request.body,
        userId: user?.id,
      });

      if (errors) {
        return response
          .status(HttpStatus.BAD_REQUEST)
          .send(FailureResponse.create(errors));
      }

      // Check if user already reviewed this business
      const existingReview = await this.reviewService.getReviewEntityByProperty(
        {
          userId: user?.id,
          businessId: input.businessId,
        }
      );

      if (existingReview) {
        return response
          .status(HttpStatus.BAD_REQUEST)
          .send(
            FailureResponse.create("You've already reviewed this business")
          );
      }

      const resource = await this.reviewService.createReview(input);
      return response
        .status(HttpStatus.CREATED)
        .send(SuccessResponse.create(resource));
    } catch (error) {
      next(error);
    }
  }

  async updateReview(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const reviewId = request.params.id;
      const user = request.user;
      const { errors, input } = await RequestValidator(ReviewDto, request.body);

      if (errors) {
        return response
          .status(HttpStatus.BAD_REQUEST)
          .send(FailureResponse.create(errors));
      }

      const existingReview = await this.reviewService.getReviewEntityByProperty(
        {
          id: reviewId,
        }
      );

      if (!existingReview) {
        return response
          .status(HttpStatus.NOT_FOUND)
          .send(FailureResponse.create("Review not found"));
      }

      if (existingReview.userId !== user?.id) {
        return response
          .status(HttpStatus.FORBIDDEN)
          .send(FailureResponse.create("You can only update your own reviews"));
      }

      const resource = await this.reviewService.updateReview(
        existingReview,
        input
      );
      return response
        .status(HttpStatus.OK)
        .send(SuccessResponse.create(resource));
    } catch (error) {
      next(error);
    }
  }

  async getUserReviews(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const userId = request.params.userId;
      const reviews = await this.reviewService.getUserReviews(userId);
      return response
        .status(HttpStatus.OK)
        .send(SuccessResponse.create(reviews));
    } catch (error) {
      next(error);
    }
  }

  async getBusinessReviews(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const businessId = request.params.businessId;
      const reviews = await this.reviewService.getBusinessReviews(businessId);
      return response
        .status(HttpStatus.OK)
        .send(SuccessResponse.create(reviews));
    } catch (error) {
      next(error);
    }
  }

  async deleteReview(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const reviewId = request.params.id;
      const user = request.user;

      const existingReview = await this.reviewService.getReviewEntityByProperty(
        {
          id: reviewId,
        }
      );

      if (!existingReview) {
        return response
          .status(HttpStatus.NOT_FOUND)
          .send(FailureResponse.create("Review not found"));
      }

      if (existingReview.userId !== user?.id) {
        return response
          .status(HttpStatus.FORBIDDEN)
          .send(FailureResponse.create("You can only delete your own reviews"));
      }

      await this.reviewService.deleteReview(existingReview);
      return response.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  }
}
