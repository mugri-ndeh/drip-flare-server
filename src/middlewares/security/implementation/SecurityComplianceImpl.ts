import { NextFunction, Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import HttpStatus from 'http-status';
import { validate } from 'uuid';
import SecurityCompliance from '../SecurityCompliance';
import { injectable } from 'inversify';

import 'dotenv/config';
import { FailureResponse } from '../../../utils/failure_response';
import { decrypt } from '../../../utils/genUtils';

declare module 'express' {
  interface Request {
    user?: any;
    file?: any;
    files?: any[];
  }
}

//Follow dependency injection principle, SOLID principle and clean code
@injectable()
export default class SecurityComplianceImpl implements SecurityCompliance {
  constructor() {}

  async authCompliance(request: Request, response: Response, next: NextFunction): Promise<any> {
    try {
      if (request.headers['authorization']) {
        let authorization = request.header('authorization')!.split(' ');
        if (authorization[0] !== 'Bearer') {
          response.status(HttpStatus.FORBIDDEN).send(FailureResponse.create('Invalid token'));
          return;
        } else {
          const user = decrypt(
            jwt.verify(authorization[1], process.env.JWT_PRIVATE_KEY!).toString(),
          );

          if (user) {
            request.user = user!;
            next();
          } else {
            response.status(HttpStatus.FORBIDDEN).send(FailureResponse.create('Invalid token'));
            return;
          }
        }
      } else {
        response.status(HttpStatus.FORBIDDEN).json(FailureResponse.create('Token not provided'));
      }
    } catch (exp) {
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send(
          FailureResponse.create(
            FailureResponse.create('An unexpected error occurred while authorizing user'),
          ),
        );
    }
  }

  async generateToken(user: any): Promise<any> {
    return jwt.sign(user, process.env.JWT_PRIVATE_KEY!, {
      // expiresIn: `7d`,
    });
  }

  async generateRefreshToken(user: any): Promise<any> {
    return jwt.sign(user, process.env.JWT_PRIVATE_KEY!, {
      // expiresIn: `24d`,
    });
  }

  async uuidStandardCompliance(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<any> {
    if (!validate(request.params.id)) {
      return response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send(FailureResponse.create('Invalid UUID id'));
    }
    next();
  }

  async roleCompliance(): Promise<any> {
    return async (request: Request, response: Response, next: NextFunction) => {
      if (!this.containsAll(request.user.role, ['USER', 'ADMIN'])) {
        return response
          .status(HttpStatus.UNAUTHORIZED)
          .send(FailureResponse.create('Unable to access resource due to authorization issues'));
      }
      next();
    };
  }

  //verify that all user roles contains all verifiable roles
  private containsAll(authUserRoles: string[], verifiableRoles: string[]): boolean {
    return verifiableRoles.every((role) => authUserRoles.includes(role));
  }

  // follow don't repeat yourself (DRY) principle
  private checkRoleAndProceed(
    request: Request,
    response: Response,
    next: NextFunction,
    role: string,
  ): any {
    if (!request.user.roles.includes(role)) {
      return response
        .status(HttpStatus.UNAUTHORIZED)
        .send(FailureResponse.create('Unable to access resource due to authorization issues'));
    }
    next();
  }
}
