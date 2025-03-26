import { injectable, inject } from "inversify";
import { IOC } from "../../config/inversify/inversify.ioc.types";
import { ICommentRepository } from "../../repository/RepositoryInterfaces";
import ICommentService from "../ICommentService";
import { CommentDto } from "../../dto/CommentDto";
import AppComment from "../../models/Comment";
import { plainToClass } from "class-transformer";

@injectable()
export default class CommentService implements ICommentService {
  private readonly iCommentRepository: ICommentRepository;

  constructor(
    @inject(IOC.ICommentRepository) CommentRepository: ICommentRepository
  ) {
    this.iCommentRepository = CommentRepository;
  }
  async createComment(commentRequestDto: CommentDto): Promise<AppComment> {
    let data = plainToClass(AppComment, commentRequestDto);
    const category = await this.iCommentRepository.create(data);
    return Promise.resolve(category);
  }
  async updateComment(
    comment: AppComment,
    commentDto: CommentDto
  ): Promise<AppComment> {
    let commentU: AppComment = await this.iCommentRepository.findOne({
      id: comment.id,
    });

    for (const [key, value] of Object.entries(commentDto)) {
      if (value !== undefined) {
        (commentU as any)[key] = value;
      }
    }

    const commentResponse: AppComment = await this.iCommentRepository.update(
      comment.id,
      commentU
    );

    return Promise.resolve(commentResponse);
  }
  async getCommentByProperty(property: any): Promise<AppComment> {
    try {
      const comment = await this.iCommentRepository.findOne(property);
      return Promise.resolve(comment);
    } catch (error) {
      throw error;
    }
  }
  async getUserComments(id: string): Promise<AppComment[]> {
    const comments = await this.iCommentRepository.find({ userId: id });
    return Promise.resolve(comments);
  }
  async getPostComments(id: string): Promise<AppComment[]> {
    const comments = await this.iCommentRepository.find({ postId: id });
    return Promise.resolve(comments);
  }
  async deleteComment(comment: AppComment): Promise<void> {
    await this.iCommentRepository.delete(comment);
  }
}
