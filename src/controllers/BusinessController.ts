import { injectable, inject } from "inversify";
import { IOC } from "../config/inversify/inversify.ioc.types";
import IBusinessService from "../services/IBusinessService";

@injectable()
export default class BusinessController {
  private businessService: IBusinessService;

  constructor(@inject(IOC.IBusinessService) businessService: IBusinessService) {
    this.businessService = businessService;
  }
}
