import { injectable, inject } from "inversify";
import { IOC } from "../../config/inversify/inversify.ioc.types";
import { IReviewRepository } from "../../repository/RepositoryInterfaces";
import IReviewService from "../IReviewService";
import { ReviewDto } from "../../dto/ReviewDto";
import Review from "../../models/Review";
import { plainToClass } from "class-transformer";

@injectable()
export default class ReviewService implements IReviewService {
  private readonly iReviewRepository: IReviewRepository;

  constructor(
    @inject(IOC.IReviewRepository) ReviewRepository: IReviewRepository
  ) {
    this.iReviewRepository = ReviewRepository;
  }
  async createReview(reviewRequestDto: ReviewDto): Promise<Review> {
    let data = plainToClass(Review, reviewRequestDto);
    const review = await this.iReviewRepository.create(data);
    return Promise.resolve(review);
  }
  async updateReview(review: Review, reviewDto: ReviewDto): Promise<Review> {
    if (reviewDto)
      for (const [key, value] of Object.entries(reviewDto)) {
        if (value !== undefined) {
          (review as any)[key] = value;
        }
      }

    const reviewResponse: Review = await this.iReviewRepository.update(
      review.id,
      review
    );

    return Promise.resolve(reviewResponse);
  }
  async getUserReviews(id: string): Promise<Review[]> {
    throw new Error("Method not implemented.");
  }
  async getBusinessReviews(id: string): Promise<Review[]> {
    const reviews = await this.iReviewRepository.find({ businessId: id });
    return Promise.resolve(reviews);
  }
  async getReviewEntityByProperty(property: any): Promise<Review> {
    const review = await this.iReviewRepository.findOne(property);
    return Promise.resolve(review);
  }
  async deleteReview(review: Review): Promise<void> {
    await this.iReviewRepository.delete(review);
  }
}
