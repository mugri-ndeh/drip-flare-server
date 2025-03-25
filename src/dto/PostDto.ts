import { Expose } from "class-transformer";
import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsOptional,
  IsUUID,
} from "class-validator";
import { BaseDto } from "./BaseDto";

// Post DTO
export class PostDto extends BaseDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  designCode!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  mediaUrl!: string;

  @Expose()
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  actions!: string[];

  @Expose()
  @IsString()
  @IsNotEmpty()
  description!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  cost!: string;

  @Expose()
  @IsString()
  @IsOptional()
  rentDeposit?: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  listedRegisteredSize!: string;

  @Expose()
  @IsUUID()
  @IsNotEmpty()
  businessId!: string;
}
