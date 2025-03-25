import { Expose } from "class-transformer";
import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import BaseEntity from "./BaseEntity";
import AppComment from "./Comment";
import Save from "./Save";
import Like from "./Like";
import Business from "./Business";

@Entity("posts")
export default class Post extends BaseEntity {
  @Expose()
  @Column()
  designCode!: string;

  @Expose()
  @Column()
  mediaUrl!: string;

  @Expose()
  @Column("text", { nullable: false })
  actions!: string[];

  @Expose()
  @Column()
  description!: string;

  @Expose()
  @Column()
  cost!: string;

  @Expose()
  @Column({ nullable: true })
  rentDeposit!: string;

  @Expose()
  @Column()
  listedRegisteredSize!: string;

  @OneToMany(() => AppComment, (comment) => comment.user)
  comments!: AppComment[];

  @OneToMany(() => Save, (save) => save.post)
  saves!: Save[];

  @OneToMany(() => Like, (like) => like.post)
  likes!: Like[];

  @ManyToOne(() => Business, (business) => business.posts)
  @JoinColumn({ name: "businessId" })
  business!: Business;

  @Expose()
  @Column()
  businessId!: string;
}
