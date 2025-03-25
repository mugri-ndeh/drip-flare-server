import { injectable, inject } from "inversify";
import { IOC } from "../../config/inversify/inversify.ioc.types";
import IReviewRepository from "../IReviewService";
import IReviewService from "../IReviewService";
import { ReviewDto } from "../../dto/ReviewDto";
import Review from "../../models/Review";

@injectable()
export default class ReviewService implements IReviewService {
  private readonly iReviewRepository: IReviewRepository;

  constructor(
    @inject(IOC.IReviewRepository) ReviewRepository: IReviewRepository
  ) {
    this.iReviewRepository = ReviewRepository;
  }
  createReview(reviewRequestDto: ReviewDto): Promise<Review> {
    throw new Error("Method not implemented.");
  }
  updateReview(review: Review, reviewDto: ReviewDto): Promise<Review> {
    throw new Error("Method not implemented.");
  }
  getUserReviews(id: string): Promise<Review[]> {
    throw new Error("Method not implemented.");
  }
  getBusinessReviews(id: string): Promise<Review[]> {
    throw new Error("Method not implemented.");
  }
  getReviewEntityByProperty(id: any): Promise<Review> {
    throw new Error("Method not implemented.");
  }
  deleteReview(Review: Review): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
