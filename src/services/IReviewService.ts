import { ReviewDto } from "../dto/ReviewDto";
import Review from "../models/Review";

export default interface IReviewService {
  createReview(reviewRequestDto: ReviewDto): Promise<Review>;

  updateReview(review: Review, reviewDto: ReviewDto): Promise<Review>;

  getUserReviews(id: string): Promise<Review[]>;

  getBusinessReviews(id: string): Promise<Review[]>;

  getReviewEntityByProperty(id: any): Promise<Review>;

  deleteReview(Review: Review): Promise<void>;
}
