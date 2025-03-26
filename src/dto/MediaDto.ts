import { Expose } from "class-transformer";
import { IsString, IsNotEmpty } from "class-validator";
import { BaseDto } from "./BaseDto";

export class MediaDto extends BaseDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  fileUrl!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  type!: string;
}
