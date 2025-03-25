import { injectable } from "inversify";
import { ICategoryRepository } from "../RepositoryInterfaces";

import Category from "../../models/Category";
import { Repository } from "./Repository";

@injectable()
export default class CategoryRepository
  extends Repository<Category>
  implements ICategoryRepository
{
  constructor() {
    super();
    this.modelClass = Category;
  }
}
