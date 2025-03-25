import { injectable } from "inversify";

import { IPostRepository } from "../RepositoryInterfaces";
import { Repository } from "./Repository";
import Post from "../../models/Post";

@injectable()
export default class PostRepository
  extends Repository<Post>
  implements IPostRepository
{
  constructor() {
    super();
    this.modelClass = Post;
  }
}
