import { injectable, inject } from "inversify";
import { IOC } from "../../config/inversify/inversify.ioc.types";
import { INotificationRepository } from "../../repository/RepositoryInterfaces";
import INotificationService from "../INotificationService";
import { NotificationDto } from "../../dto/NotificationDto";
import AppNotification from "../../models/Notification";

@injectable()
export default class NotificationService implements INotificationService {
  private readonly iNotificationRepository: INotificationRepository;

  constructor(
    @inject(IOC.INotificationRepository)
    NotificationRepository: INotificationRepository
  ) {
    this.iNotificationRepository = NotificationRepository;
  }
  createNotification(
    notificationRequestDto: NotificationDto
  ): Promise<AppNotification> {
    throw new Error("Method not implemented.");
  }
  updateNotification(
    notification: Notification,
    notificationDto: NotificationDto
  ): Promise<Notification> {
    throw new Error("Method not implemented.");
  }
  geNotificationByProperty(property: any): Promise<AppNotification> {
    throw new Error("Method not implemented.");
  }
  getUserNotifications(id: string): Promise<AppNotification[]> {
    throw new Error("Method not implemented.");
  }
  readNotification(id: string): Promise<AppNotification> {
    throw new Error("Method not implemented.");
  }
  deleteNotification(Notification: AppNotification): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
