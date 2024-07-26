import {NextFunction, Request, Response} from "express";
import {ErrorCode, HttpException } from "../expections/root";
import { InternalException } from "../expections/internal-exception";
import {date, ZodError, ZodSchema} from "zod";
import {BadRequestsException} from "../expections/bad-requests";
import { ErrorHandler } from "../types";
export const errorHandler = <T extends ZodSchema<any>>(handler: ErrorHandler<T>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (handler.schema) {
                handler.schema.parse(req.body);
            }
            await handler.method(req, res, next);
        } catch (error: any) {
            let exception: HttpException;
            if(error instanceof HttpException) {
                exception = error;
            } else {
                if(error instanceof  ZodError){
                    exception = new BadRequestsException('Unprocessable entity', ErrorCode.UNPROCESSABLE, error);
                } else {
                    exception = new InternalException('Something went wrong!', ErrorCode.UNAUTHORIZED,error);
                }
            }
            next(exception);
        }
    } 
}