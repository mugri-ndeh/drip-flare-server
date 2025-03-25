import { injectable, inject } from "inversify";
import { IOC } from "../../config/inversify/inversify.ioc.types";
import { IMeasurementRepository } from "../../repository/RepositoryInterfaces";
import IMeasurementService from "../IMeasurementService";
import { MeasurementDto } from "../../dto/MeasurementDto";
import Measurement from "../../models/Measurement";

@injectable()
export default class MeasurementService implements IMeasurementService {
  private readonly iMeasurementRepository: IMeasurementRepository;

  constructor(
    @inject(IOC.IMeasurementRepository)
    MeasurementRepository: IMeasurementRepository
  ) {
    this.iMeasurementRepository = MeasurementRepository;
  }
  createMeasurement(
    measurementRequestDto: MeasurementDto
  ): Promise<Measurement> {
    throw new Error("Method not implemented.");
  }
  updateMeasurement(
    measurement: Measurement,
    measurementDto: MeasurementDto
  ): Promise<Measurement> {
    throw new Error("Method not implemented.");
  }
  geMeasurementByProperty(property: any): Promise<Measurement> {
    throw new Error("Method not implemented.");
  }
  getUserMeasurement(id: string): Promise<Measurement> {
    throw new Error("Method not implemented.");
  }
  deleteMeasurement(Measurement: Measurement): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
