import Media from "../models/Media";

export default interface IMediaService {
  createMedia(mediaRequestDto: Media): Promise<Media>;

  updateMedia(Media: Media): Promise<Media>;

  geMediaByProperty(property: any): Promise<Media>;

  getMediaEntityById(id: string): Promise<Media>;

  deleteMedia(Media: Media): Promise<void>;
}
