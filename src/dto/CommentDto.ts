import { Expose } from "class-transformer";
import { IsString, IsNotEmpty, IsUUID, IsOptional } from "class-validator";
import { BaseDto } from "./BaseDto";

// Comment DTO
export class CommentDto extends BaseDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  comment?: string;

  @Expose()
  @IsUUID()
  @IsNotEmpty()
  userId?: string;

  @Expose()
  @IsUUID()
  @IsNotEmpty()
  postId?: string;
}
