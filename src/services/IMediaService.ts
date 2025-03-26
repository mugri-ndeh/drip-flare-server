import { MediaDto } from "../dto/MediaDto";
import Media from "../models/Media";

export default interface IMediaService {
  createMedia(mediaRequestDto: MediaDto): Promise<Media>;

  updateMedia(media: Media, mediaDto: MediaDto): Promise<Media>;

  geMediaByProperty(property: any): Promise<Media>;

  getMediaEntityById(id: string): Promise<Media>;

  deleteMedia(Media: Media): Promise<void>;
}
