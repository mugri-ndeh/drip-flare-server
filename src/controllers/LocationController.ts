import { NextFunction, Request, Response } from "express";

import HttpStatus from "http-status";
import { RequestValidator } from "../utils/RequestValidator";
import { FailureResponse } from "../utils/failure_response";
import { IOC } from "../config/inversify/inversify.ioc.types";
import { inject, injectable } from "inversify";
import ILocationService from "../services/ILocationService";
import { LocationDto } from "../dto/LocationDto";
import AppLocation from "../models/Location";
import { SuccessResponse } from "../utils/success_respons";

@injectable()
export default class LocationController {
  private locationService: ILocationService;

  constructor(@inject(IOC.ILocationService) locationService: ILocationService) {
    this.locationService = locationService;
  }

  async createOrUpdateLocation(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const user = request.user;
      const { errors, input } = await RequestValidator(LocationDto, {
        ...request.body,
        userId: user?.id,
      });

      if (errors) {
        return response
          .status(HttpStatus.BAD_REQUEST)
          .send(FailureResponse.create(errors));
      }

      // Check if location already exists for user
      const existingLocation = await this.locationService.getUserLocation(
        user?.id ?? ""
      );

      let resource: AppLocation;
      if (existingLocation) {
        resource = await this.locationService.updateLocation(
          existingLocation,
          input
        );
      } else {
        resource = await this.locationService.createLocation(input);
      }

      return response
        .status(existingLocation ? HttpStatus.OK : HttpStatus.CREATED)
        .send(SuccessResponse.create(resource));
    } catch (error) {
      next(error);
    }
  }

  async getMyLocation(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const user = request.user;
      const resource = await this.locationService.getUserLocation(
        user?.id ?? ""
      );

      if (!resource) {
        return response
          .status(HttpStatus.NOT_FOUND)
          .send(FailureResponse.create("Location not found"));
      }

      return response
        .status(HttpStatus.OK)
        .send(SuccessResponse.create(resource));
    } catch (error) {
      next(error);
    }
  }

  async deleteLocation(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const locationId = request.params.id;
      const user = request.user;

      const existingLocation = await this.locationService.geLocationByProperty({
        id: locationId,
      });

      if (!existingLocation) {
        return response
          .status(HttpStatus.NOT_FOUND)
          .send(FailureResponse.create("Location not found"));
      }

      if (existingLocation.userId !== user?.id) {
        return response
          .status(HttpStatus.FORBIDDEN)
          .send(
            FailureResponse.create("You can only delete your own location")
          );
      }

      await this.locationService.deleteLocation(existingLocation);
      return response.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  }
}
