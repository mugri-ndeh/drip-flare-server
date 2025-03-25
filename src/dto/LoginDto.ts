import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import User from "../models/User";

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}

export default class LoginResponseDto {
  @Expose()
  accessToken!: string;
  @Expose()
  refreshToken!: string;
  @Expose()
  userDetails!: User;
  @Expose()
  expiresIn!: Date;
}
