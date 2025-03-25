import { injectable } from "inversify";

import Save from "../../models/Save";
import { ISaveRepository } from "../RepositoryInterfaces";
import { Repository } from "./Repository";

@injectable()
export default class SaveRepository
  extends Repository<Save>
  implements ISaveRepository
{
  constructor() {
    super();
    this.modelClass = Save;
  }
}
