import { injectable, inject } from "inversify";
import { IOC } from "../../config/inversify/inversify.ioc.types";
import { IMediaRepository } from "../../repository/RepositoryInterfaces";
import IMediaService from "../IMediaService";
import Media from "../../models/Media";
import { plainToClass } from "class-transformer";
import { MediaDto } from "../../dto/MediaDto";

@injectable()
export default class MediaService implements IMediaService {
  private readonly iMediaRepository: IMediaRepository;

  constructor(@inject(IOC.IMediaRepository) MediaRepository: IMediaRepository) {
    this.iMediaRepository = MediaRepository;
  }
  async createMedia(mediaRequestDto: MediaDto): Promise<Media> {
    let data = plainToClass(Media, mediaRequestDto);
    const media = await this.iMediaRepository.create(data);
    return Promise.resolve(media);
  }
  async updateMedia(media: Media, mediaDto: MediaDto): Promise<Media> {
    if (mediaDto)
      for (const [key, value] of Object.entries(mediaDto)) {
        if (value !== undefined) {
          (media as any)[key] = value;
        }
      }

    const mediaResponse: Media = await this.iMediaRepository.update(
      media.id,
      media
    );

    return Promise.resolve(mediaResponse);
  }
  async geMediaByProperty(property: any): Promise<Media> {
    const media = await this.iMediaRepository.findOne(property);
    return Promise.resolve(media);
  }
  async getMediaEntityById(id: string): Promise<Media> {
    const media = await this.iMediaRepository.findOne({ id });
    return Promise.resolve(media);
  }
  async deleteMedia(Media: Media): Promise<void> {
    await this.iMediaRepository.delete(Media);
  }
}
