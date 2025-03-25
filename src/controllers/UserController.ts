import { injectable, inject } from "inversify";
import { IOC } from "../config/inversify/inversify.ioc.types";
import IUserService from "../services/IUserService";

@injectable()
export default class UserController {
  private userService: IUserService;

  constructor(@inject(IOC.IUserService) userService: IUserService) {
    this.userService = userService;
  }
}
