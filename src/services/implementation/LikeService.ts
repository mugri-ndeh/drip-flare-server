import { injectable, inject } from "inversify";
import { IOC } from "../../config/inversify/inversify.ioc.types";
import { ILikeRepository } from "../../repository/RepositoryInterfaces";
import ILikeService from "../ILikeService";
import { LikeDto } from "../../dto/LikeDto";
import Like from "../../models/Like";
import { plainToClass } from "class-transformer";

@injectable()
export default class LikeService implements ILikeService {
  private readonly iLikeRepository: ILikeRepository;

  constructor(@inject(IOC.ILikeRepository) LikeRepository: ILikeRepository) {
    this.iLikeRepository = LikeRepository;
  }
  async createLike(likeRequestDto: LikeDto): Promise<Like> {
    let data = plainToClass(Like, likeRequestDto);
    const category = await this.iLikeRepository.create(data);
    return Promise.resolve(category);
  }
  async updateLike(like: Like, likeDto: LikeDto): Promise<Like> {
    let likeU: Like = await this.iLikeRepository.findOne({
      id: like.id,
    });

    for (const [key, value] of Object.entries(likeDto)) {
      if (value !== undefined) {
        (likeU as any)[key] = value;
      }
    }

    const likeResponse: Like = await this.iLikeRepository.update(
      like.id,
      likeU
    );

    return Promise.resolve(likeResponse);
  }
  async getLikeByProperty(property: any): Promise<Like> {
    const like = await this.iLikeRepository.findOne(property);
    return Promise.resolve(like);
  }
  async getUserLikes(id: string): Promise<Like[]> {
    const likes = await this.iLikeRepository.find({ userId: id });
    return Promise.resolve(likes);
  }
  async getPosLikest(id: string): Promise<Like[]> {
    const likes = await this.iLikeRepository.find({ postId: id });
    return Promise.resolve(likes);
  }
  async getCommentLikes(id: string): Promise<Like[]> {
    const likes = await this.iLikeRepository.find({ commentId: id });
    return Promise.resolve(likes);
  }
  async deleteLike(like: Like): Promise<void> {
    await this.iLikeRepository.delete(like);
  }
}
