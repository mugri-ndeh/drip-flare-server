import { NextFunction, Request, Response } from "express";
import { SuccessResponse } from "../utils/success_respons";
import HttpStatus from "http-status";
import jwt from "jsonwebtoken";
import { RequestValidator } from "../utils/RequestValidator";

import { FailureResponse } from "../utils/failure_response";

import IUserService from "../services/IUserService";
import { IOC } from "../config/inversify/inversify.ioc.types";
import { inject, injectable } from "inversify";
import { RegisterDto } from "../dto/RegisterDto";
import { LoginDto, RefreshTokenDTO } from "../dto/LoginDto";
import User from "../models/User";

@injectable()
export default class UserController {
  private userService: IUserService;

  constructor(@inject(IOC.IUserService) userService: IUserService) {
    this.userService = userService;
  }

  async getAuthenticatedUser(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      return response
        .status(HttpStatus.CREATED)
        .send(SuccessResponse.create(request.user));
    } catch (error) {
      next(error);
    }
  }

  async registerUser(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { errors, input } = await RequestValidator(
        RegisterDto,
        request.body
      );

      if (errors)
        return response
          .status(HttpStatus.BAD_REQUEST)
          .send(FailureResponse.create(errors));

      const user = await this.userService.getUserByProperty({
        email: input.email,
      });

      if (user && user.email === input.email)
        return response
          .status(HttpStatus.ALREADY_REPORTED)
          .send(FailureResponse.create("User already exist with email"));
      const resource = await this.userService.registerUser(input);

      let loggedInUser: User = await this.userService.getUserByProperty({
        email: resource.email!,
      });

      const loginResponse =
        await this.userService.generateUserToken(loggedInUser);

      return response
        .status(HttpStatus.CREATED)
        .send(SuccessResponse.create(loginResponse));
    } catch (error) {
      next(error);
    }
  }

  async login(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { errors, input } = await RequestValidator(LoginDto, request.body);

      if (errors)
        return response
          .status(HttpStatus.BAD_REQUEST)
          .send(FailureResponse.create(errors));

      let loggedInUser: User = await this.userService.getUserByProperty({
        email: input.email!,
      });

      if (!loggedInUser)
        return response
          .status(HttpStatus.NOT_FOUND)
          .send(FailureResponse.create("User Not found"));

      const isPasswordValid: boolean =
        await this.userService.verifyPasswordAuthenticityWithEmailOrPhoneNumber(
          { email: input.email! },
          input.password
        );

      if (!isPasswordValid)
        return response
          .status(HttpStatus.UNAUTHORIZED)
          .send(FailureResponse.create("invalid user email or password"));

      const loginResponse =
        await this.userService.generateUserToken(loggedInUser);
      return response
        .status(HttpStatus.OK)
        .send(SuccessResponse.create(loginResponse));
    } catch (error) {
      next(error);
      // return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(FailureResponse.create(error));
    }
  }

  async updateUser(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const user = await request.body;

      if (!user)
        return response
          .status(HttpStatus.NOT_FOUND)
          .send(
            FailureResponse.create(
              HttpStatus[`${HttpStatus.NOT_FOUND}_MESSAGE`]
            )
          );

      const { errors, input } = await RequestValidator(
        RegisterDto,
        request.body
      );

      if (errors)
        return response
          .status(HttpStatus.BAD_REQUEST)
          .send(FailureResponse.create(errors));

      const resource: User | null = await this.userService.updateUser(
        user,
        input
      );

      if (!resource) {
        return response
          .status(HttpStatus.NOT_FOUND)
          .send(FailureResponse.create("User Not Found"));
      }

      return response
        .status(HttpStatus.OK)
        .send(SuccessResponse.create(resource));
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { errors, input } = await RequestValidator(
        RefreshTokenDTO,
        request.body
      );

      if (errors)
        return response
          .status(HttpStatus.BAD_REQUEST)
          .send(FailureResponse.create(errors));

      const user = jwt.verify(
        input.refreshToken,
        process.env.JWT_REFRESH_PRIVATE_KEY!
      ) as User;

      const loginResponse = await this.userService.generateUserToken(user);

      return response
        .status(HttpStatus.OK)
        .send(SuccessResponse.create(loginResponse));
    } catch (error) {
      next(error);
    }
  }
}
