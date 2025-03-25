import { Expose } from "class-transformer";
import { Entity, Column } from "typeorm";
import BaseEntity from "./BaseEntity";

@Entity("categories")
export default class Category extends BaseEntity {
  @Expose()
  @Column()
  name!: string;
}
