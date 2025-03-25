import { injectable } from "inversify";

import AppLocation from "../../models/Location";
import { ILocationRepository } from "../RepositoryInterfaces";
import { Repository } from "./Repository";

@injectable()
export default class LocationRepository
  extends Repository<AppLocation>
  implements ILocationRepository
{
  constructor() {
    super();
    this.modelClass = AppLocation;
  }
}
