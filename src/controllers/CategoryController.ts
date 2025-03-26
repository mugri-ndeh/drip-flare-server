import { NextFunction, Request, Response } from "express";

import HttpStatus from "http-status";
import { RequestValidator } from "../utils/RequestValidator";
import { FailureResponse } from "../utils/failure_response";
import { IOC } from "../config/inversify/inversify.ioc.types";
import { inject, injectable } from "inversify";
import ICategoryService from "../services/ICategoryService";
import { CategoryDto } from "../dto/CategoryDto";
import Category from "../models/Category";
import { SuccessResponse } from "../utils/success_respons";

@injectable()
export default class CategoryController {
  private categoryService: ICategoryService;

  constructor(@inject(IOC.ICategoryService) categoryService: ICategoryService) {
    this.categoryService = categoryService;
  }

  async getAllCategories(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const categories = await this.categoryService.getAllCategories({});
      return response
        .status(HttpStatus.OK)
        .send(SuccessResponse.create(categories));
    } catch (error) {
      next(error);
    }
  }

  async createCategory(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { errors, input } = await RequestValidator(
        CategoryDto,
        request.body
      );
      if (errors) {
        return response
          .status(HttpStatus.BAD_REQUEST)
          .send(FailureResponse.create(errors));
      }

      const resource = await this.categoryService.createCategory(input);
      return response
        .status(HttpStatus.CREATED)
        .send(SuccessResponse.create(resource));
    } catch (error) {
      next(error);
    }
  }

  async updateCategory(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const categoryId = request.params.id;
      const { errors, input } = await RequestValidator(
        CategoryDto,
        request.body
      );
      if (errors) {
        return response
          .status(HttpStatus.BAD_REQUEST)
          .send(FailureResponse.create(errors));
      }

      const existingCategory = await this.categoryService.getCategoryByProperty(
        { id: categoryId }
      );
      if (!existingCategory) {
        return response
          .status(HttpStatus.NOT_FOUND)
          .send(FailureResponse.create("Category not found"));
      }

      const resource = await this.categoryService.updateCategory(
        existingCategory,
        input
      );
      return response
        .status(HttpStatus.OK)
        .send(SuccessResponse.create(resource));
    } catch (error) {
      next(error);
    }
  }

  async deleteCategory(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const categoryId = request.params.id;
      const existingCategory = await this.categoryService.getCategoryByProperty(
        { id: categoryId }
      );
      if (!existingCategory) {
        return response
          .status(HttpStatus.NOT_FOUND)
          .send(FailureResponse.create("Category not found"));
      }

      await this.categoryService.deleteCategory(existingCategory);
      return response.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  }
}
