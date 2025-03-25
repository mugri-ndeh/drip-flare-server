import { NotificationDto } from "../dto/NotificationDto";
import AppNotification from "../models/Notification";

export default interface INotificationService {
  createNotification(
    notificationRequestDto: NotificationDto
  ): Promise<AppNotification>;

  updateNotification(
    notification: Notification,
    notificationDto: NotificationDto
  ): Promise<Notification>;

  geNotificationByProperty(property: any): Promise<AppNotification>;

  getUserNotifications(id: string): Promise<AppNotification[]>;

  readNotification(id: string): Promise<AppNotification>;

  deleteNotification(Notification: AppNotification): Promise<void>;
}
