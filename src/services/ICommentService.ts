import { CommentDto } from "../dto/CommentDto";
import AppComment from "../models/Comment";

export default interface ICommentService {
  createComment(commentRequestDto: CommentDto): Promise<AppComment>;

  updateComment(comment: Comment, commentDto: CommentDto): Promise<Comment>;

  getCommentByProperty(property: any): Promise<AppComment>;

  getUserComments(id: string): Promise<AppComment[]>;

  getPostComments(id: string): Promise<AppComment[]>;

  deleteComment(Comment: AppComment): Promise<void>;
}
