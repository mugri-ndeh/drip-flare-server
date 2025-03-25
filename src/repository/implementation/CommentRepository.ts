import { injectable } from "inversify";

import AppComment from "../../models/Comment";
import { ICommentRepository } from "../RepositoryInterfaces";
import { Repository } from "./Repository";

@injectable()
export default class CommentRepository
  extends Repository<AppComment>
  implements ICommentRepository
{
  constructor() {
    super();
    this.modelClass = AppComment;
  }
}
