import { NextFunction, Request, Response } from "express";

import HttpStatus from "http-status";
import { RequestValidator } from "../utils/RequestValidator";
import { FailureResponse } from "../utils/failure_response";
import { IOC } from "../config/inversify/inversify.ioc.types";
import { inject, injectable } from "inversify";
import IFaqService from "../services/IFaqService";
import { FaqDto } from "../dto/FaqDto";
import Faq from "../models/Faq";
import { SuccessResponse } from "../utils/success_respons";

@injectable()
export default class FaqController {
  private faqService: IFaqService;

  constructor(@inject(IOC.IFaqService) faqService: IFaqService) {
    this.faqService = faqService;
  }

  async getFaqs(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const faqs = await this.faqService.getFaqs();
      return response.status(HttpStatus.OK).send(SuccessResponse.create(faqs));
    } catch (error) {
      next(error);
    }
  }

  async createFaq(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { errors, input } = await RequestValidator(FaqDto, request.body);
      if (errors) {
        return response
          .status(HttpStatus.BAD_REQUEST)
          .send(FailureResponse.create(errors));
      }

      const resource = await this.faqService.createFaq(input);
      return response
        .status(HttpStatus.CREATED)
        .send(SuccessResponse.create(resource));
    } catch (error) {
      next(error);
    }
  }

  async updateFaq(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const faqId = request.params.id;
      const { errors, input } = await RequestValidator(FaqDto, request.body);
      if (errors) {
        return response
          .status(HttpStatus.BAD_REQUEST)
          .send(FailureResponse.create(errors));
      }

      const existingFaq = await this.faqService.geFaqByProperty({ id: faqId });
      if (!existingFaq) {
        return response
          .status(HttpStatus.NOT_FOUND)
          .send(FailureResponse.create("FAQ not found"));
      }

      const resource = await this.faqService.updateFaq(existingFaq, input);
      return response
        .status(HttpStatus.OK)
        .send(SuccessResponse.create(resource));
    } catch (error) {
      next(error);
    }
  }

  async deleteFaq(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const faqId = request.params.id;
      const existingFaq = await this.faqService.geFaqByProperty({ id: faqId });
      if (!existingFaq) {
        return response
          .status(HttpStatus.NOT_FOUND)
          .send(FailureResponse.create("FAQ not found"));
      }

      await this.faqService.deleteFaq(existingFaq);
      return response.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  }
}
