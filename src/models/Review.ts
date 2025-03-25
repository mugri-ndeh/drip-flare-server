import { Expose } from "class-transformer";
import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import BaseEntity from "./BaseEntity";
import User from "./User";
import Business from "./Business";

@Entity("reviews")
export default class Review extends BaseEntity {
  @Expose()
  @Column()
  review!: string;

  @Expose()
  @Column({ type: "float" })
  rating!: number;

  @ManyToOne(() => User, (user) => user.reviews, {
    cascade: true,
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "userId" })
  user!: User;

  @Column()
  userId!: string;

  @ManyToOne(() => Business, (business) => business.reviews, {
    cascade: true,
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "businessId" })
  business!: Business;

  @Column()
  businessId!: string;
}
