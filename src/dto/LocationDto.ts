import { Expose } from "class-transformer";
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsUUID,
} from "class-validator";
import { BaseDto } from "./BaseDto";

// Location DTO
export class LocationDto extends BaseDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  country!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  streetName!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  buildingNumber!: string;

  @Expose()
  @IsString()
  @IsOptional()
  others?: string;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  latitute!: number;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  longitude!: number;

  @Expose()
  @IsUUID()
  @IsNotEmpty()
  userId!: string;
}
