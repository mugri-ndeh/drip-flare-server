import { injectable, inject } from "inversify";
import { IOC } from "../config/inversify/inversify.ioc.types";
import ILikeService from "../services/ILikeService";

@injectable()
export default class LikeController {
  private likeService: ILikeService;

  constructor(@inject(IOC.ILikeService) likeService: ILikeService) {
    this.likeService = likeService;
  }
}
