import { injectable } from "inversify";

import Media from "../../models/Media";
import { IMediaRepository } from "../RepositoryInterfaces";
import { Repository } from "./Repository";

@injectable()
export default class MediaRepository
  extends Repository<Media>
  implements IMediaRepository
{
  constructor() {
    super();
    this.modelClass = Media;
  }
}
