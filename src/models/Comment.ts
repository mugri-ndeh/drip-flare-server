import { Expose } from "class-transformer";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import BaseEntity from "./BaseEntity";
import Business from "./Business";

import Like from "./Like";
import Post from "./Post";
import User from "./User";

@Entity("comments")
export default class AppComment extends BaseEntity {
  @Expose()
  @Column()
  comment!: string;

  @ManyToOne(() => User, (user) => user.comments, {
    cascade: true,
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "userId" })
  user!: User;

  @Column()
  userId!: string;

  @OneToMany(() => Like, (like) => like.comment)
  @JoinColumn()
  likes!: Like[];

  @ManyToOne(() => Post, (post) => post.comments, {
    cascade: true,
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "postId" })
  post!: Post;

  @Expose()
  @Column()
  postId!: string;
}
