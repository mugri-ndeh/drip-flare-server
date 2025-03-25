import { Expose } from "class-transformer";
import { IsEnum, IsNotEmpty, IsUUID } from "class-validator";
import { BaseDto } from "./BaseDto";

// Like DTO
export class LikeDto extends BaseDto {
  @Expose()
  @IsEnum(["comment", "post"])
  @IsNotEmpty()
  type!: string;

  @Expose()
  @IsUUID()
  @IsNotEmpty()
  userId!: string;

  @Expose()
  @IsUUID()
  @IsNotEmpty()
  itemId!: string;
}
