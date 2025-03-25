import { injectable, inject } from "inversify";
import { IOC } from "../../config/inversify/inversify.ioc.types";
import ICommentRepository from "../ICommentService";
import ICommentService from "../ICommentService";
import { CommentDto } from "../../dto/CommentDto";
import AppComment from "../../models/Comment";

@injectable()
export default class CommentService implements ICommentService {
  private readonly iCommentRepository: ICommentRepository;

  constructor(
    @inject(IOC.ICommentRepository) CommentRepository: ICommentRepository
  ) {
    this.iCommentRepository = CommentRepository;
  }
  createComment(commentRequestDto: CommentDto): Promise<AppComment> {
    throw new Error("Method not implemented.");
  }
  updateComment(comment: Comment, commentDto: CommentDto): Promise<Comment> {
    throw new Error("Method not implemented.");
  }
  getCommentByProperty(property: any): Promise<AppComment> {
    throw new Error("Method not implemented.");
  }
  getUserComments(id: string): Promise<AppComment[]> {
    throw new Error("Method not implemented.");
  }
  getPostComments(id: string): Promise<AppComment[]> {
    throw new Error("Method not implemented.");
  }
  deleteComment(Comment: AppComment): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
