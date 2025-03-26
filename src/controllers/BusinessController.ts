import { NextFunction, Request, Response } from "express";

import HttpStatus from "http-status";
import { RequestValidator } from "../utils/RequestValidator";
import { FailureResponse } from "../utils/failure_response";
import { IOC } from "../config/inversify/inversify.ioc.types";
import { inject, injectable } from "inversify";
import { BusinessDto } from "../dto/BusinessDto";
import IBusinessService from "../services/IBusinessService";
import Business from "../models/Business";
import { SuccessResponse } from "../utils/success_respons";

@injectable()
export default class BusinessController {
  private businessService: IBusinessService;

  constructor(@inject(IOC.IBusinessService) businessService: IBusinessService) {
    this.businessService = businessService;
  }

  async createBusiness(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { errors, input } = await RequestValidator(
        BusinessDto,
        request.body
      );

      if (errors) {
        return response
          .status(HttpStatus.BAD_REQUEST)
          .send(FailureResponse.create(errors));
      }
      const user = request.user;
      console.log("====================================");
      console.log("USER ID", user);
      console.log("====================================");

      const resource = await this.businessService.createBusiness({
        ...input,
        userId: user?.id,
      });
      return response
        .status(HttpStatus.CREATED)
        .send(SuccessResponse.create(resource));
    } catch (error) {
      next(error);
    }
  }

  async updateBusiness(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { errors, input } = await RequestValidator(
        BusinessDto,
        request.body
      );

      if (errors) {
        return response
          .status(HttpStatus.BAD_REQUEST)
          .send(FailureResponse.create(errors));
      }

      const businessId = request.params.id;
      const existingBusiness =
        await this.businessService.getBusinessById(businessId);

      if (!existingBusiness) {
        return response
          .status(HttpStatus.NOT_FOUND)
          .send(FailureResponse.create("Business not found"));
      }

      const resource = await this.businessService.updateBusiness(
        existingBusiness,
        input
      );
      return response
        .status(HttpStatus.OK)
        .send(SuccessResponse.create(resource));
    } catch (error) {
      next(error);
    }
  }

  async getBusinessById(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const businessId = request.params.id;
      const resource = await this.businessService.getBusinessById(businessId);

      if (!resource) {
        return response
          .status(HttpStatus.NOT_FOUND)
          .send(FailureResponse.create("Business not found"));
      }

      return response
        .status(HttpStatus.OK)
        .send(SuccessResponse.create(resource));
    } catch (error) {
      next(error);
    }
  }

  async getBusinessByUserId(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const userId = request.params.userId;
      const resource = await this.businessService.getBusinessByUserId(userId);

      if (!resource) {
        return response
          .status(HttpStatus.NOT_FOUND)
          .send(FailureResponse.create("Business not found for this user"));
      }

      return response
        .status(HttpStatus.OK)
        .send(SuccessResponse.create(resource));
    } catch (error) {
      next(error);
    }
  }

  async getMyBusiness(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const userId = request.user?.id;
      const resource = await this.businessService.getBusinessByUserId(userId);

      if (!resource) {
        return response
          .status(HttpStatus.NOT_FOUND)
          .send(FailureResponse.create("Business not found for this user"));
      }

      return response
        .status(HttpStatus.OK)
        .send(SuccessResponse.create(resource));
    } catch (error) {
      next(error);
    }
  }

  async deleteBusiness(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const businessId = request.params.id;
      const existingBusiness =
        await this.businessService.getBusinessById(businessId);

      if (!existingBusiness) {
        return response
          .status(HttpStatus.NOT_FOUND)
          .send(FailureResponse.create("Business not found"));
      }

      await this.businessService.deleteBusiness(existingBusiness);
      return response.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  }
}
