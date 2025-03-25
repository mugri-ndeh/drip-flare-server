import { Expose } from "class-transformer";
import { Entity, Column, ManyToMany, JoinColumn, OneToMany } from "typeorm";
import BaseEntity from "./BaseEntity";

import AppComment from "./Comment";
import Post from "./Post";
import User from "./User";

@Entity("likes")
export default class Like extends BaseEntity {
  @Expose()
  @Column({ type: "enum", enum: ["comment", "post"] })
  type!: string;

  @ManyToMany(() => User, (user) => user.likes, {
    cascade: true,
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "userId" })
  user!: User;

  @OneToMany(() => Post, (post) => post.likes)
  @JoinColumn()
  post!: Post;

  @OneToMany(() => AppComment, (comment) => comment.likes)
  @JoinColumn()
  comment!: AppComment;

  @Expose()
  @Column()
  userId!: string;

  @Expose()
  @Column()
  itemId!: string;
}
