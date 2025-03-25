import { injectable, inject } from "inversify";
import { IOC } from "../config/inversify/inversify.ioc.types";
import ICommentService from "../services/ICommentService";

@injectable()
export default class CommentController {
  private commentService: ICommentService;

  constructor(@inject(IOC.ICommentService) commentService: ICommentService) {
    this.commentService = commentService;
  }
}
