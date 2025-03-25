import { NextFunction, Request, Response} from "express";
import HttpStatus from "http-status";

export function handleException(error: any, request: Request, response: Response, next: NextFunction) {
   
    console.log(error);
    
    const code = error.code || 'UNKNOWN_ERROR';
    const detail = error.detail || '';

    const baseResponse = {
        error: true,
        message: detail
    };

    // Handle PostgreSQL error codes
    switch (code) {
        case '23505': // Unique violation
            response.status(409).json(baseResponse);
            break;            
        case '23502': // Not null violation
            response.status(400).json({error:true, message:`${error.column} can't be Null`});
            break;
        case '23503': // Foreign key violation
            response.status(404).json(baseResponse);
            break;
        case '23514': // Check constraint violation
            response.status(400).json(baseResponse);
            break;
        case '42804': // Data type mismatch
            response.status(400).json(baseResponse);
            break;
        case '22012': // Division by zero
            response.status(400).json(baseResponse);
            break;
        case '40P01': // Deadlock detected
            response.status(409).json(baseResponse);
            break;
        case '42501': // Insufficient privilege
            response.status(403).json(baseResponse);
            break;
        case '42601':
            response.status(400).json(baseResponse);
            break
        case '28000':
            response.status(401).json(baseResponse);
            break;
        case '23503':
          response.status(400).json(baseResponse);
          break;

        case '23P01':
          response.status(400).json(baseResponse);
          break;
        case '22P02':
          response.status(400).json(baseResponse);
          break;
        default:
          response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: error.message || "Internal Server error"});
    }
    return
}
