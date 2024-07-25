import {NextFunction, Request, Response} from "express";
import {ErrorCode, HttpException} from "./expections/root";
import {InternalException} from "./expections/internal-exception";


export const  errorHandler = (method: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await method(req, res, next)
        } catch (error: any) {
            let exception: HttpException;
            if(error instanceof HttpException) {
                exception = error;
            } else {
                exception = new InternalException('Something went wrong!', error, ErrorCode.UNAUTHORIZED);
            }
            next(exception);
        }
    }
}