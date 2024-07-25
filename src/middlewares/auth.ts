import { Request, Response, NextFunction } from 'express';
import {UnauthorizedException} from "../expections/unauthorized";
import {ErrorCode} from "../expections/root";
import  * as jwt from  'jsonwebtoken'
import {JWT_SECRET_KEY} from "../utils/secret";
import {prismaClient} from "../index";

const authMiddleware = async  (req: Request, res: Response, next: NextFunction) => {
  // extract token from header
//  const token = req.headers.authorization;
  const token = req.headers.authorization?.split(' ')[1];
  // exception token
  if(!token) {
    return  next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED))
  }
  try{
     // verify that token and extract the playload
     const decoded = jwt.verify(token, JWT_SECRET_KEY) as { userId: number };
     // get the user from playload
     const user = await prismaClient.user.findFirst({
        where: {id: decoded.userId}
     })
     if( !user){
       return  next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED))
     }
     // attach user to the cuurent req obj
     req.user = user;
     next();
  } catch (error) {
     next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED))
  }
};

export default authMiddleware;