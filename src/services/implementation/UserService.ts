import { injectable, inject } from "inversify";
import { IOC } from "../../config/inversify/inversify.ioc.types";
import IUserService from "../IUserService";

import { RegisterDto } from "../../dto/RegisterDto";
import User from "../../models/User";
import { genSalt } from "bcryptjs";
import { plainToClass } from "class-transformer";
import { hash } from "crypto";

import { decrypt, encrypt } from "../../utils/genUtils";
import { IUserRepository } from "../../repository/RepositoryInterfaces";
import SecurityCompliance from "../../middlewares/security/SecurityCompliance";
import { LoginResponseDto } from "../../dto/LoginDto";

@injectable()
export default class UserService implements IUserService {
  private readonly iUserRepository: IUserRepository;
  private readonly apiSecurity: SecurityCompliance;

  constructor(
    @inject(IOC.IUserRepository) userRepository: IUserRepository,
    @inject(IOC.SecurityCompliance) security: SecurityCompliance
  ) {
    this.iUserRepository = userRepository;
    this.apiSecurity = security;
  }
  deleteUser(user: User): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async registerUser(userRegistrationRequestDto: RegisterDto): Promise<User> {
    userRegistrationRequestDto.password = encrypt(
      userRegistrationRequestDto.password
    );

    const userRequest = plainToClass(User, userRegistrationRequestDto);

    const user = await this.iUserRepository.create(userRequest);

    return Promise.resolve(user);
  }

  async getUserByProperty(property: any): Promise<User> {
    try {
      const user = await this.iUserRepository.findOne(property);
      return Promise.resolve(user);
    } catch (error) {
      throw error;
    }
  }
  async getUserById(id: any): Promise<User> {
    try {
      const user = await this.iUserRepository.findById(id);
      return Promise.resolve(user);
    } catch (error) {
      throw error;
    }
  }
  async getUserEntityById(id: number): Promise<User> {
    try {
      const user = await this.iUserRepository.findById(id);

      return Promise.resolve(user);
    } catch (error) {
      throw error;
    }
  }

  async generateUserToken(user: User): Promise<LoginResponseDto> {
    const obj = JSON.stringify(user);

    const token = await this.apiSecurity.generateToken(encrypt(obj));
    const refreshToken = await this.apiSecurity.generateToken(encrypt(obj));

    const expiresIn = new Date(
      new Date().getTime() + Number(process.env.JWT_TOKEN_EXPIRY_TIME_IN_DAYS)
    );

    return Promise.resolve(
      plainToClass(
        LoginResponseDto,
        {
          refreshToken: refreshToken,
          accessToken: token,
          userDetails: user,
          expiresIn: expiresIn,
        },
        { excludeExtraneousValues: true }
      )
    );
  }

  async verifyPasswordAuthenticityWithEmailOrPhoneNumber(
    email: any,
    incomingPassword: string
  ): Promise<boolean> {
    try {
      const user: User = await this.iUserRepository.findOne(email);

      return incomingPassword === decrypt(user.password!);
    } catch (error) {
      throw error;
    }
  }

  async updateUser(user: User, userRequestDto: RegisterDto): Promise<User> {
    let users: User = await this.iUserRepository.findOne({ email: user.email });

    for (const [key, value] of Object.entries(userRequestDto)) {
      if (value !== undefined) {
        (users as any)[key] = value;
      }
    }

    if (userRequestDto.password) {
      users.password = await this.encryptPassword(userRequestDto.password);
    }

    const userResponse: User = await this.iUserRepository.update(
      user.id,
      users
    );

    return Promise.resolve(userResponse);
  }

  async encryptPassword(password: string): Promise<string> {
    const saltRounds = parseInt(process.env.BCRYPT_SALT!);
    const salt = await genSalt(saltRounds);
    return hash(password, salt);
  }
}
