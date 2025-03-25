import { injectable, inject } from "inversify";
import { IOC } from "../config/inversify/inversify.ioc.types";
import ISaveService from "../services/ISaveService";

@injectable()
export default class SaveController {
  private saveService: ISaveService;

  constructor(@inject(IOC.ISaveService) saveService: ISaveService) {
    this.saveService = saveService;
  }
}
