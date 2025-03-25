import { injectable } from "inversify";

import Review from "../../models/Review";
import { IReviewRepository } from "../RepositoryInterfaces";
import { Repository } from "./Repository";

@injectable()
export default class ReviewRepository
  extends Repository<Review>
  implements IReviewRepository
{
  constructor() {
    super();
    this.modelClass = Review;
  }
}
