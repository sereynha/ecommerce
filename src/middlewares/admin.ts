import { Request, Response, NextFunction } from "express";
import { UnauthorizedException } from "../expections/unauthorized";
import { ErrorCode } from "../expections/root";


const adminMiddleware = async ( req:Request, res:Response, next:NextFunction ) => {
    const user = req.user;
    if (user?.role == 'ADMIN') {
        next();
    } else {
        return  next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED))
    }
}

export default adminMiddleware;