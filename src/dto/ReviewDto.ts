import { Expose } from "class-transformer";
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  Max,
  IsUUID,
} from "class-validator";
import { BaseDto } from "./BaseDto";

// Review DTO
export class ReviewDto extends BaseDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  review!: string;

  @Expose()
  @IsNumber()
  @Min(0)
  @Max(5)
  @IsNotEmpty()
  rating!: number;

  @Expose()
  @IsUUID()
  @IsNotEmpty()
  userId!: string;

  @Expose()
  @IsUUID()
  @IsNotEmpty()
  businessId!: string;
}
