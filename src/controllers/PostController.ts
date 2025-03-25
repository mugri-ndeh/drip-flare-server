import { injectable, inject } from "inversify";
import { IOC } from "../config/inversify/inversify.ioc.types";
import IPostService from "../services/IPostService";

@injectable()
export default class PostController {
  private postService: IPostService;

  constructor(@inject(IOC.IPostService) postService: IPostService) {
    this.postService = postService;
  }
}
