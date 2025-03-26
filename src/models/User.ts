import { Expose } from "class-transformer";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import BaseEntity from "./BaseEntity";
import Business from "./Business";
import AppComment from "./Comment";
import Like from "./Like";
import AppLocation from "./Location";
import Measurement from "./Measurement";
import AppNotification from "./Notification";
import Review from "./Review";
import Save from "./Save";

@Entity("users")
export default class User extends BaseEntity {
  @Expose()
  @Column()
  email!: string;

  @Expose()
  @Column()
  fullName!: string;

  @Expose()
  @Column({
    type: "simple-array",
    nullable: true,
  })
  role!: string[];

  @Expose()
  @Column()
  password!: string;

  @Expose()
  @Column({ nullable: false, default: "" })
  profileLink!: string;

  @Expose()
  @Column({ nullable: false, default: "" })
  profilePictureUrl!: string;

  @Expose()
  @Column({ nullable: false, default: "" })
  bio!: string;

  @Expose()
  @Column("text", { nullable: false, default: [] })
  interests!: string[];

  @Expose()
  @Column("text", { nullable: false, default: [] })
  deviceTokens!: string[];

  @Expose()
  @Column("text", { nullable: false, default: [] })
  authMethods!: string[];

  @OneToOne(() => Business, (business) => business.user, {
    cascade: true,
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "businessId" })
  business!: Business;

  @OneToOne(() => Measurement, (measurement) => measurement.user, {
    nullable: true,
  })
  @JoinColumn({ name: "seasurementId" })
  measurement!: Measurement;

  @OneToOne(() => AppLocation, (location) => location.user, {
    nullable: true,
  })
  @JoinColumn({ name: "locationId" })
  location!: AppLocation;

  @Column({ nullable: true })
  locationId?: string;

  @OneToMany(() => AppComment, (comment) => comment.user)
  comments!: AppComment[];

  @OneToMany(() => Like, (like) => like.user)
  likes!: Like[];

  @OneToMany(() => AppNotification, (notification) => notification.user)
  notifications!: AppNotification[];

  @OneToMany(() => Review, (review) => review.user)
  reviews!: Review[];

  @OneToMany(() => Save, (save) => save.user)
  saves!: Save[];

  constructor() {
    super();
    this.role = ["USER"];
  }
}
