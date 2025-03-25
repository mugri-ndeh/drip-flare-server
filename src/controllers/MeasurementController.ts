import { injectable, inject } from "inversify";
import { IOC } from "../config/inversify/inversify.ioc.types";
import IMeasurementService from "../services/IMeasurementService";

@injectable()
export default class MeasurementController {
  private measurementService: IMeasurementService;

  constructor(
    @inject(IOC.IMeasurementService) measurementService: IMeasurementService
  ) {
    this.measurementService = measurementService;
  }
}
