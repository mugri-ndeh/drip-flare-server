import { Expose } from "class-transformer";
import { Entity, Column, JoinColumn, OneToOne } from "typeorm";
import BaseEntity from "./BaseEntity";
import User from "./User";

@Entity("measurements")
export default class Measurement extends BaseEntity {
  @Expose()
  @Column({ type: "integer" })
  height!: number;

  @Expose()
  @Column({ type: "integer" })
  chestCircumference!: number;

  @Expose()
  @Column({ type: "integer" })
  waistCircumference!: number;

  @Expose()
  @Column({ type: "integer" })
  hipCircumference!: number;

  @Expose()
  @Column({ type: "integer" })
  shoulderWidth!: number;

  @Expose()
  @Column({ type: "integer" })
  sleeveLength!: number;

  @Expose()
  @Column({ type: "integer" })
  inseam!: number;

  @Expose()
  @Column({ type: "integer" })
  trouserlength!: number;

  @Expose()
  @Column()
  size!: string;

  @Expose()
  @Column()
  footWearSize!: string;

  @OneToOne(() => User, (user) => user.measurement, {
    cascade: true,
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "userId" })
  user!: User;

  @Expose()
  @Column()
  userId!: string;
}
