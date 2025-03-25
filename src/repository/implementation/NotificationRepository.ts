import { injectable } from "inversify";

import { INotificationRepository } from "../RepositoryInterfaces";
import { Repository } from "./Repository";
import AppNotification from "../../models/Notification";

@injectable()
export default class NotificationRepository
  extends Repository<AppNotification>
  implements INotificationRepository
{
  constructor() {
    super();
    this.modelClass = AppNotification;
  }
}
