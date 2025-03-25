import { Expose } from "class-transformer";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import BaseEntity from "./BaseEntity";
import User from "./User";
import Post from "./Post";

@Entity("saves")
export default class Save extends BaseEntity {
  @ManyToOne(() => User, (user) => user.saves, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user!: User;

  @Expose()
  @Column()
  userId!: string;

  @ManyToOne(() => Post, (post) => post.saves, { onDelete: "CASCADE" })
  @JoinColumn({ name: "postId" })
  post!: Post;

  @Expose()
  @Column()
  postId!: string;
}
