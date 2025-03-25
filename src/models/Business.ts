import { Expose } from "class-transformer";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import BaseEntity from "./BaseEntity";
import User from "./User";

import Review from "./Review";
import Post from "./Post";

@Entity("businesses")
export default class Business extends BaseEntity {
  @Expose()
  @Column()
  name!: string;

  @Expose()
  @Column()
  phoneNumber!: string;

  @Expose()
  @Column()
  address!: string;

  @Expose()
  @Column()
  accountName!: string;

  @Expose()
  @Column()
  accountNumber!: string;

  @Expose()
  @Column()
  bankName!: string;

  @Expose()
  @Column()
  idNumber!: string;

  @Expose()
  @Column()
  bvn!: string;

  @Column({ type: "enum", enum: ["laundry", "designer"], default: "designer" })
  type!: "laundry" | "designer";

  @OneToOne(() => User, (user) => user.business)
  @JoinColumn()
  user!: User;

  @Expose()
  @Column()
  userId!: string;

  @OneToMany(() => Review, (review) => review.business)
  reviews!: Review[];

  @OneToMany(() => Post, (post) => post.business, { cascade: true })
  @JoinColumn()
  posts!: Post[];
}
