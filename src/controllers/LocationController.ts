import { injectable, inject } from "inversify";
import { IOC } from "../config/inversify/inversify.ioc.types";
import ILocationService from "../services/ILocationService";

@injectable()
export default class LocationController {
  private locationService: ILocationService;

  constructor(@inject(IOC.ILocationService) locationService: ILocationService) {
    this.locationService = locationService;
  }
}
