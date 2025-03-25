import { injectable } from "inversify";

import User from "../../models/User";
import { Repository } from "./Repository";
import { IUserRepository } from "../RepositoryInterfaces";

@injectable()
export default class UserRepository
  extends Repository<User>
  implements IUserRepository
{
  constructor() {
    super();
    this.modelClass = User;
  }
}
