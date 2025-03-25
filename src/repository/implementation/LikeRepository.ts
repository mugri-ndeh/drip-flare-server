import { injectable } from "inversify";

import Like from "../../models/Like";
import { ILikeRepository } from "../RepositoryInterfaces";
import { Repository } from "./Repository";

@injectable()
export default class LikeRepository
  extends Repository<Like>
  implements ILikeRepository
{
  constructor() {
    super();
    this.modelClass = Like;
  }
}
