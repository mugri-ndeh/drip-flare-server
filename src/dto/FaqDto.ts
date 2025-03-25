import { Expose } from "class-transformer";
import { IsString, IsNotEmpty, IsOptional } from "class-validator";
import { BaseDto } from "./BaseDto";

// FAQ DTO
export class FaqDto extends BaseDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  question!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  answer!: string;
}
