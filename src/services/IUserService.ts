import LoginResponseDto from "../dto/LoginDto";
import { RegisterDto } from "../dto/RegisterDto";
import User from "../models/User";

export default interface IUserService {
  registerUser(registrationDto: RegisterDto): Promise<User>;

  updateUser(user: User, userRequestDto: RegisterDto): Promise<User>;

  getUserByProperty(property: any): Promise<User>;

  getUserById(id: any): Promise<User>;

  getUserEntityById(id: number): Promise<User>;

  verifyPasswordAuthenticityWithEmailOrPhoneNumber(
    emailOrPhoneNumberObject: any,
    incomingPassword: string
  ): Promise<boolean>;

  generateUserToken(user: User): Promise<LoginResponseDto>;
  deleteUser(user: User): Promise<void>;
}
