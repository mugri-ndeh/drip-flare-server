import { injectable, inject } from "inversify";
import { IOC } from "../../config/inversify/inversify.ioc.types";
import IUserService from "../IUserService";
import IUserRepository from "../IUserService";
import LoginResponseDto from "../../dto/LoginDto";
import { RegisterDto } from "../../dto/RegisterDto";
import User from "../../models/User";

@injectable()
export default class UserService implements IUserService {
  private readonly iUserRepository: IUserRepository;

  constructor(@inject(IOC.IUserRepository) UserRepository: IUserRepository) {
    this.iUserRepository = UserRepository;
  }
  registerUser(registrationDto: RegisterDto): Promise<User> {
    throw new Error("Method not implemented.");
  }
  updateUser(user: User, userRequestDto: RegisterDto): Promise<User> {
    throw new Error("Method not implemented.");
  }
  getUserByProperty(property: any): Promise<User> {
    throw new Error("Method not implemented.");
  }
  getUserById(id: any): Promise<User> {
    throw new Error("Method not implemented.");
  }
  getUserEntityById(id: number): Promise<User> {
    throw new Error("Method not implemented.");
  }
  verifyPasswordAuthenticityWithEmailOrPhoneNumber(
    emailOrPhoneNumberObject: any,
    incomingPassword: string
  ): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  generateUserToken(user: User): Promise<LoginResponseDto> {
    throw new Error("Method not implemented.");
  }
  deleteUser(user: User): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
