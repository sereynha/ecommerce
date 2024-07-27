import {Request, Response} from 'express';
import {prismaClient} from "../index";
import  {hashSync, compareSync} from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import {JWT_EXPIRES_IN, JWT_SECRET_KEY} from "../utils/secret";
import {BadRequestsException} from "../expections/bad-requests";
import {ErrorCode} from "../expections/root";
import {NotFoundException} from "../expections/not-found";

export  const signup = async  (req: Request,res: Response) => {
    const {email, password, name} = req.body;
    let user = await prismaClient.user.findFirst({
        where: {email}
    });
    if (user) {
        throw new  BadRequestsException('User Not Fount!',ErrorCode.ALLREADY_EXISTS);
    }
    user = await  prismaClient.user.create({
        data: {
            name,
            email,
            password: hashSync(password, 10)
        }
    });
    res.status(201).json({
        message: 'Create successful',
        success: true
    });
}

export  const login = async (req: Request,res: Response) => {
    const {email, password} = req.body;
    let user = await prismaClient.user.findFirst({
        where: { email }
    });
    if (!user) {
        throw new  NotFoundException('User Not Fount!',ErrorCode.NOT_FOUND);
    }
    if(!compareSync(password,user.password)){
        throw new  BadRequestsException('Incorrect password!',ErrorCode.UNAUTHORIZED);
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRES_IN });
    res.status(200).json({
        message: 'Login successful',
        user: user,
        token
    });
}


export  const loggedInUser = async  (req: Request, res: Response) => {
    res.json(req.user);
}
