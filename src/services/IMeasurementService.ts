import { MeasurementDto } from "../dto/MeasurementDto";
import Measurement from "../models/Measurement";

export default interface IMeasurementService {
  createMeasurement(
    measurementRequestDto: MeasurementDto
  ): Promise<Measurement>;

  updateMeasurement(
    measurement: Measurement,
    measurementDto: MeasurementDto
  ): Promise<Measurement>;

  geMeasurementByProperty(property: any): Promise<Measurement>;

  getUserMeasurement(id: string): Promise<Measurement>;

  deleteMeasurement(Measurement: Measurement): Promise<void>;
}
