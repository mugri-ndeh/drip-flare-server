import { Request, Response, NextFunction } from 'express';
import { sign, verify } from 'jsonwebtoken';
import { FailureResponse } from '../utils/failure_response';
import HttpStatus from 'http-status';

export const validateToken = async (request: Request, response: Response, next: NextFunction) => {
  try {
    if (request.headers['authorization']) {
      let authorization = request.header('authorization')!.split(' ');
      if (authorization[0] !== 'Bearer') {
        response.status(HttpStatus.FORBIDDEN).send(FailureResponse.create('Invalid token'));
        return;
      } else {
        const user = verify(authorization[1], process.env.JWT_PRIVATE_KEY!);
        if (user) {
          // request.user = JSON.parse(decrypt(user!));
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
};

export const generateToken = async (user: any): Promise<any> => {
  return sign(user, process.env.JWT_PRIVATE_KEY!, {
    expiresIn: `${parseInt(process.env.JWT_TOKEN_EXPIRY_TIME_INHOURS!)}h`,
  });
};
