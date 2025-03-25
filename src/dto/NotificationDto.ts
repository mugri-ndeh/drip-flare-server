import { Expose } from "class-transformer";
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsUUID,
  IsArray,
} from "class-validator";
import { BaseDto } from "./BaseDto";

// Notification DTO
export class NotificationDto extends BaseDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  title!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  message!: string;

  @Expose()
  @IsArray()
  @IsNotEmpty()
  deviceTokens!: string[];

  @Expose()
  @IsEnum(["save", "comment", "follow", "bid", "request", "other"])
  @IsOptional()
  type?: "save" | "comment" | "follow" | "bid" | "request" | "other" = "other";

  @Expose()
  @IsUUID()
  @IsNotEmpty()
  userId!: string;
}
