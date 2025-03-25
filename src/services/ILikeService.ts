import { LikeDto } from "../dto/LikeDto";
import Like from "../models/Like";

export default interface ILikeService {
  createLike(likeRequestDto: LikeDto): Promise<Like>;

  updateLike(like: Like, likeDto: LikeDto): Promise<Like>;

  getLikeByProperty(property: any): Promise<Like>;

  getUserLikes(id: string): Promise<Like[]>;

  getPosLikest(id: string): Promise<Like[]>;

  getCommentLikes(id: string): Promise<Like>[];

  deleteLike(Like: Like): Promise<void>;
}
