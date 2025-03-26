import { injectable, inject } from "inversify";
import { IOC } from "../../config/inversify/inversify.ioc.types";
import { INotificationRepository } from "../../repository/RepositoryInterfaces";
import INotificationService from "../INotificationService";
import { NotificationDto } from "../../dto/NotificationDto";
import AppNotification from "../../models/Notification";
import { plainToClass } from "class-transformer";

@injectable()
export default class NotificationService implements INotificationService {
  private readonly iNotificationRepository: INotificationRepository;

  constructor(
    @inject(IOC.INotificationRepository)
    NotificationRepository: INotificationRepository
  ) {
    this.iNotificationRepository = NotificationRepository;
  }
  async createNotification(
    notificationRequestDto: NotificationDto
  ): Promise<AppNotification> {
    let data = plainToClass(AppNotification, notificationRequestDto);
    const notification = await this.iNotificationRepository.create(data);
    return Promise.resolve(notification);
  }
  updateNotification(
    notification: Notification,
    notificationDto: NotificationDto
  ): Promise<Notification> {
    throw new Error("Method not implemented.");
  }
  async geNotificationByProperty(property: any): Promise<AppNotification> {
    const notification = await this.iNotificationRepository.findOne(property);
    return Promise.resolve(notification);
  }
  async getUserNotifications(id: string): Promise<AppNotification[]> {
    const notification = await this.iNotificationRepository.find({
      userId: id,
    });
    return Promise.resolve(notification);
  }
  async readNotification(id: string): Promise<AppNotification> {
    const notification: AppNotification =
      await this.iNotificationRepository.findOne({ userId: id });
    notification.isRead = true;
    const notificationResponse: AppNotification =
      await this.iNotificationRepository.update(id, notification);
    return Promise.resolve(notificationResponse);
  }
  async deleteNotification(notification: AppNotification): Promise<void> {
    await this.iNotificationRepository.delete(notification);
  }
}
