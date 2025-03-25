import { injectable } from "inversify";

import Business from "../../models/Business";
import { IBusinessRepository } from "../RepositoryInterfaces";
import { Repository } from "./Repository";

@injectable()
export default class BusinessRepository
  extends Repository<Business>
  implements IBusinessRepository
{
  constructor() {
    super();
    this.modelClass = Business;
  }
}
