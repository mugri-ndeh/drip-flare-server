import { NextFunction, Request, Response } from "express";
import { SuccessResponse } from "../utils/success_respons";
import HttpStatus from "http-status";
import { RequestValidator } from "../utils/RequestValidator";
import { FailureResponse } from "../utils/failure_response";
import { IOC } from "../config/inversify/inversify.ioc.types";
import { inject, injectable } from "inversify";
import IMeasurementService from "../services/IMeasurementService";
import { MeasurementDto } from "../dto/MeasurementDto";
import Measurement from "../models/Measurement";

@injectable()
export default class MeasurementController {
  private measurementService: IMeasurementService;

  constructor(
    @inject(IOC.IMeasurementService) measurementService: IMeasurementService
  ) {
    this.measurementService = measurementService;
  }

  async createOrUpdateMeasurement(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const user = request.user;
      const { errors, input } = await RequestValidator(MeasurementDto, {
        ...request.body,
        userId: user?.id,
      });

      if (errors) {
        return response
          .status(HttpStatus.BAD_REQUEST)
          .send(FailureResponse.create(errors));
      }

      // Check if measurement already exists for user
      const existingMeasurement =
        await this.measurementService.getUserMeasurement(user?.id ?? "");

      let resource: Measurement;
      if (existingMeasurement) {
        resource = await this.measurementService.updateMeasurement(
          existingMeasurement,
          input
        );
      } else {
        resource = await this.measurementService.createMeasurement(input);
      }

      return response
        .status(existingMeasurement ? HttpStatus.OK : HttpStatus.CREATED)
        .send(SuccessResponse.create(resource));
    } catch (error) {
      next(error);
    }
  }

  async getMyMeasurement(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const user = request.user;
      const resource = await this.measurementService.getUserMeasurement(
        user?.id ?? ""
      );

      if (!resource) {
        return response
          .status(HttpStatus.NOT_FOUND)
          .send(FailureResponse.create("Measurements not found"));
      }

      return response
        .status(HttpStatus.OK)
        .send(SuccessResponse.create(resource));
    } catch (error) {
      next(error);
    }
  }

  async deleteMeasurement(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const measurementId = request.params.id;
      const user = request.user;

      const existingMeasurement =
        await this.measurementService.geMeasurementByProperty({
          id: measurementId,
        });

      if (!existingMeasurement) {
        return response
          .status(HttpStatus.NOT_FOUND)
          .send(FailureResponse.create("Measurements not found"));
      }

      if (existingMeasurement.userId !== user?.id) {
        return response
          .status(HttpStatus.FORBIDDEN)
          .send(
            FailureResponse.create("You can only delete your own measurements")
          );
      }

      await this.measurementService.deleteMeasurement(existingMeasurement);
      return response.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  }
}
