import { injectable, inject } from "inversify";
import { IOC } from "../config/inversify/inversify.ioc.types";
import IReviewService from "../services/IReviewService";

@injectable()
export default class ReviewController {
  private reviewService: IReviewService;

  constructor(@inject(IOC.IReviewService) reviewService: IReviewService) {
    this.reviewService = reviewService;
  }
}
