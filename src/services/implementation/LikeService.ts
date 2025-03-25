import { injectable, inject } from "inversify";
import { IOC } from "../../config/inversify/inversify.ioc.types";
import ILikeRepository from "../ILikeService";
import ILikeService from "../ILikeService";
import { LikeDto } from "../../dto/LikeDto";
import Like from "../../models/Like";

@injectable()
export default class LikeService implements ILikeService {
  private readonly iLikeRepository: ILikeRepository;

  constructor(@inject(IOC.ILikeRepository) LikeRepository: ILikeRepository) {
    this.iLikeRepository = LikeRepository;
  }
  createLike(likeRequestDto: LikeDto): Promise<Like> {
    throw new Error("Method not implemented.");
  }
  updateLike(like: Like, likeDto: LikeDto): Promise<Like> {
    throw new Error("Method not implemented.");
  }
  getLikeByProperty(property: any): Promise<Like> {
    throw new Error("Method not implemented.");
  }
  getUserLikes(id: string): Promise<Like[]> {
    throw new Error("Method not implemented.");
  }
  getPosLikest(id: string): Promise<Like[]> {
    throw new Error("Method not implemented.");
  }
  getCommentLikes(id: string): Promise<Like>[] {
    throw new Error("Method not implemented.");
  }
  deleteLike(Like: Like): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
