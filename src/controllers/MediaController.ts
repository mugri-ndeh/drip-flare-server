import { injectable, inject } from "inversify";
import { IOC } from "../config/inversify/inversify.ioc.types";
import IMediaService from "../services/IMediaService";

@injectable()
export default class MediaController {
  private mediaService: IMediaService;

  constructor(@inject(IOC.IMediaService) mediaService: IMediaService) {
    this.mediaService = mediaService;
  }
}
