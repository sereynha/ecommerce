import {HttpException} from "../expections/root";
import {NextFunction,Request,Response} from "express";

export const errorMiddleWare = (error: HttpException, req:Request, res:Response, next: NextFunction) => {
    res.status(error.statusCode).json({
        message: error.message,
        errorCode: error.errorCode,
        error: error.errors
    })
}

