import { Expose } from "class-transformer";
import { Entity, Column, JoinColumn, ManyToOne } from "typeorm";
import BaseEntity from "./BaseEntity";
import User from "./User";

@Entity("notifications")
export default class AppNotification extends BaseEntity {
  @Expose()
  @Column()
  title!: string;

  @Expose()
  @Column()
  message!: string;

  @Expose()
  @Column()
  isRead!: boolean;

  @Expose()
  @Column({ type: "text" })
  deviceToken!: string[];

  @Column({
    type: "enum",
    enum: ["save", "comment", "follow", "bid", "request", "other"],
    default: "other",
  })
  type!: "save" | "comment" | "follow" | "bid" | "request" | "other";

  @ManyToOne(() => User, (user) => user.notifications, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user!: User;

  @Column()
  userId!: string;
}
