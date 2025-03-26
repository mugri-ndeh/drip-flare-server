import { NextFunction, Request, Response } from "express";
import { SuccessResponse } from "../utils/success_respons";
import HttpStatus from "http-status";
import { RequestValidator } from "../utils/RequestValidator";
import { FailureResponse } from "../utils/failure_response";
import { IOC } from "../config/inversify/inversify.ioc.types";
import { inject, injectable } from "inversify";
import INotificationService from "../services/INotificationService";
import { NotificationDto } from "../dto/NotificationDto";
import AppNotification from "../models/Notification";

@injectable()
export default class NotificationController {
  private notificationService: INotificationService;

  constructor(
    @inject(IOC.INotificationService) notificationService: INotificationService
  ) {
    this.notificationService = notificationService;
  }

  async createNotification(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { errors, input } = await RequestValidator(
        NotificationDto,
        request.body
      );
      if (errors) {
        return response
          .status(HttpStatus.BAD_REQUEST)
          .send(FailureResponse.create(errors));
      }

      const resource = await this.notificationService.createNotification(input);
      return response
        .status(HttpStatus.CREATED)
        .send(SuccessResponse.create(resource));
    } catch (error) {
      next(error);
    }
  }

  async getMyNotifications(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const user = request.user;
      const notifications = await this.notificationService.getUserNotifications(
        user?.id ?? ""
      );
      return response
        .status(HttpStatus.OK)
        .send(SuccessResponse.create(notifications));
    } catch (error) {
      next(error);
    }
  }

  async readNotification(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const notificationId = request.params.id;
      const user = request.user;

      const existingNotification =
        await this.notificationService.geNotificationByProperty({
          id: notificationId,
        });

      if (!existingNotification) {
        return response
          .status(HttpStatus.NOT_FOUND)
          .send(FailureResponse.create("Notification not found"));
      }

      if (existingNotification.userId !== user?.id) {
        return response
          .status(HttpStatus.FORBIDDEN)
          .send(
            FailureResponse.create(
              "You can only mark your own notifications as read"
            )
          );
      }

      const resource =
        await this.notificationService.readNotification(notificationId);
      return response
        .status(HttpStatus.OK)
        .send(SuccessResponse.create(resource));
    } catch (error) {
      next(error);
    }
  }

  async deleteNotification(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const notificationId = request.params.id;
      const user = request.user;

      const existingNotification =
        await this.notificationService.geNotificationByProperty({
          id: notificationId,
        });

      if (!existingNotification) {
        return response
          .status(HttpStatus.NOT_FOUND)
          .send(FailureResponse.create("Notification not found"));
      }

      if (existingNotification.userId !== user?.id) {
        return response
          .status(HttpStatus.FORBIDDEN)
          .send(
            FailureResponse.create("You can only delete your own notifications")
          );
      }

      await this.notificationService.deleteNotification(existingNotification);
      return response.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  }
}
