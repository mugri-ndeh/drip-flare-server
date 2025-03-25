import { injectable } from "inversify";

import Measurement from "../../models/Measurement";
import { IMeasurementRepository } from "../RepositoryInterfaces";
import { Repository } from "./Repository";

@injectable()
export default class MeasurementRepository
  extends Repository<Measurement>
  implements IMeasurementRepository
{
  constructor() {
    super();
    this.modelClass = Measurement;
  }
}
