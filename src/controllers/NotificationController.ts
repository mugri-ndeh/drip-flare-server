import { injectable, inject } from "inversify";
import { IOC } from "../config/inversify/inversify.ioc.types";
import INotificationService from "../services/INotificationService";

@injectable()
export default class NotificationController {
  private notificationService: INotificationService;

  constructor(
    @inject(IOC.INotificationService) notificationService: INotificationService
  ) {
    this.notificationService = notificationService;
  }
}
