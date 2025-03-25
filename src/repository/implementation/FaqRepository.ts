import { injectable } from "inversify";

import Faq from "../../models/Faq";
import { IFaqRepository } from "../RepositoryInterfaces";
import { Repository } from "./Repository";

@injectable()
export default class FaqRepository
  extends Repository<Faq>
  implements IFaqRepository
{
  constructor() {
    super();
    this.modelClass = Faq;
  }
}
