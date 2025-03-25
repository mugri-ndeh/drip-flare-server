import { Expose } from "class-transformer";
import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import BaseEntity from "./BaseEntity";
import User from "./User";

@Entity("locations")
export default class AppLocation extends BaseEntity {
  @Expose()
  @Column()
  country!: string;

  @Expose()
  @Column()
  streetName!: string;

  @Expose()
  @Column()
  buildingNumber!: string;

  @Expose()
  @Column()
  others!: string;

  @Expose()
  @Column({ type: "float" })
  latitute!: number;

  @Expose()
  @Column({ type: "float" })
  longitude!: number;

  @OneToOne(() => User, (user) => user.location, {
    cascade: true,
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "userId" })
  user!: User;

  @Expose()
  @Column()
  userId!: string;
}
