import { Expose } from "class-transformer";
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Max,
  Min,
} from "class-validator";

// Base DTO with common properties
export class BaseDto {
  @Expose()
  @IsUUID()
  @IsOptional()
  id?: string;
}
