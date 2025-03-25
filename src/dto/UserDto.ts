import { Expose } from "class-transformer";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  IsOptional,
  IsArray,
} from "class-validator";
import { BaseDto } from "./BaseDto";

// User DTO
export class UserDto extends BaseDto {
  @Expose()
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @Length(6)
  password!: string;

  @Expose()
  @IsString()
  @IsOptional()
  profileLink?: string;

  @Expose()
  @IsString()
  @IsOptional()
  profilePictureUrl?: string;

  @Expose()
  @IsString()
  @IsOptional()
  bio?: string;

  @Expose()
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  interests?: string[] = [];

  @Expose()
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  deviceTokens?: string[] = [];

  @Expose()
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  authMethods?: string[] = [];
}
