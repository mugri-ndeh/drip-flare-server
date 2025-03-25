import { Column, Entity } from "typeorm";
import BaseEntity from "./BaseEntity";
import { Expose } from "class-transformer";

@Entity("media")
export default class Media extends BaseEntity {
  @Expose()
  @Column()
  name!: string;

  @Expose()
  @Column()
  fileUrl!: string;

  @Expose()
  @Column()
  type!: string;
}
