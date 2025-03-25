import { injectable, inject } from "inversify";
import { IOC } from "../../config/inversify/inversify.ioc.types";
import { IMediaRepository } from "../../repository/RepositoryInterfaces";
import IMediaService from "../IMediaService";
import Media from "../../models/Media";

@injectable()
export default class MediaService implements IMediaService {
  private readonly iMediaRepository: IMediaRepository;

  constructor(@inject(IOC.IMediaRepository) MediaRepository: IMediaRepository) {
    this.iMediaRepository = MediaRepository;
  }
  createMedia(mediaRequestDto: Media): Promise<Media> {
    throw new Error("Method not implemented.");
  }
  updateMedia(Media: Media): Promise<Media> {
    throw new Error("Method not implemented.");
  }
  geMediaByProperty(property: any): Promise<Media> {
    throw new Error("Method not implemented.");
  }
  getMediaEntityById(id: string): Promise<Media> {
    throw new Error("Method not implemented.");
  }
  deleteMedia(Media: Media): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
