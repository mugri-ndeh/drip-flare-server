import { Expose } from "class-transformer";
import { IsUUID, IsNotEmpty } from "class-validator";
import { BaseDto } from "./BaseDto";

// Save DTO
export class SaveDto extends BaseDto {
  @Expose()
  @IsUUID()
  @IsNotEmpty()
  userId!: string;

  @Expose()
  @IsUUID()
  @IsNotEmpty()
  postId!: string;
}
