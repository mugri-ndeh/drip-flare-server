import { Column, Entity } from "typeorm";
import BaseEntity from "./BaseEntity";
import { Expose } from "class-transformer";

@Entity("faqs")
export default class Faq extends BaseEntity {
  @Expose()
  @Column()
  question!: string;

  @Expose()
  @Column()
  answer!: string;
}
