import { Expose } from "class-transformer";
import { IsInt, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { BaseDto } from "./BaseDto";

// Measurement DTO
export class MeasurementDto extends BaseDto {
  @Expose()
  @IsInt()
  @IsNotEmpty()
  height!: number;

  @Expose()
  @IsInt()
  @IsNotEmpty()
  chestCircumference!: number;

  @Expose()
  @IsInt()
  @IsNotEmpty()
  waistCircumference!: number;

  @Expose()
  @IsInt()
  @IsNotEmpty()
  hipCircumference!: number;

  @Expose()
  @IsInt()
  @IsNotEmpty()
  shoulderWidth!: number;

  @Expose()
  @IsInt()
  @IsNotEmpty()
  sleeveLength!: number;

  @Expose()
  @IsInt()
  @IsNotEmpty()
  inseam!: number;

  @Expose()
  @IsInt()
  @IsNotEmpty()
  trouserlength!: number;

  @Expose()
  @IsString()
  @IsNotEmpty()
  size!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  footWearSize!: string;

  @Expose()
  @IsUUID()
  @IsNotEmpty()
  userId!: string;
}
