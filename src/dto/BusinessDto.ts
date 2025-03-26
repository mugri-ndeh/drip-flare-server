import { Expose } from "class-transformer";
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsUUID,
} from "class-validator";
import { BaseDto } from "./BaseDto";

// Business DTO
export class BusinessDto extends BaseDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  phoneNumber!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  address!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  accountName!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  accountNumber!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  bankName!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  idNumber!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  bvn!: string;

  @Expose()
  @IsEnum(["laundry", "designer"])
  @IsOptional()
  type?: "laundry" | "designer" = "designer";

  @Expose()
  userId?: string;
}
