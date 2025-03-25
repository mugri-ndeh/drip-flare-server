import { Expose } from "class-transformer";
import { IsString, IsNotEmpty } from "class-validator";
import { BaseDto } from "./BaseDto";

// Category DTO
export class CategoryDto extends BaseDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  name!: string;
}
