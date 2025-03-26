import { injectable, inject } from "inversify";
import { IOC } from "../../config/inversify/inversify.ioc.types";
import { IMeasurementRepository } from "../../repository/RepositoryInterfaces";
import IMeasurementService from "../IMeasurementService";
import { MeasurementDto } from "../../dto/MeasurementDto";
import Measurement from "../../models/Measurement";
import { plainToClass } from "class-transformer";

@injectable()
export default class MeasurementService implements IMeasurementService {
  private readonly iMeasurementRepository: IMeasurementRepository;

  constructor(
    @inject(IOC.IMeasurementRepository)
    MeasurementRepository: IMeasurementRepository
  ) {
    this.iMeasurementRepository = MeasurementRepository;
  }
  async createMeasurement(
    measurementRequestDto: MeasurementDto
  ): Promise<Measurement> {
    let data = plainToClass(Measurement, measurementRequestDto);
    const measurement = await this.iMeasurementRepository.create(data);
    return Promise.resolve(measurement);
  }
  async updateMeasurement(
    measurement: Measurement,
    measurementDto: MeasurementDto
  ): Promise<Measurement> {
    let measurementU: Measurement = await this.iMeasurementRepository.findOne({
      id: measurement.id,
    });

    for (const [key, value] of Object.entries(measurementDto)) {
      if (value !== undefined) {
        (measurementU as any)[key] = value;
      }
    }

    const faqResponse: Measurement = await this.iMeasurementRepository.update(
      measurement.id,
      measurementU
    );

    return Promise.resolve(faqResponse);
  }
  async geMeasurementByProperty(property: any): Promise<Measurement> {
    const measurement = await this.iMeasurementRepository.findOne(property);
    return Promise.resolve(measurement);
  }
  async getUserMeasurement(id: string): Promise<Measurement> {
    const measurement = await this.iMeasurementRepository.findOne({
      userId: id,
    });
    return Promise.resolve(measurement);
  }
  async deleteMeasurement(measurement: Measurement): Promise<void> {
    await this.iMeasurementRepository.delete(measurement);
  }
}
