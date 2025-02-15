import { Request, Response } from 'express'
import {NotFoundException} from "../expections/not-found";
import {ErrorCode} from "../expections/root";
import {prismaClient} from "../config/prisma-client";
import {UpdateUserSchema} from "../schema/users";
import { Address} from '@prisma/client';

export const createAddress = async ( req: Request, res: Response) => {
     await  prismaClient.address.create({
        data: {
            ...req.body,
            userId: +req.user.id
        }
    })
    res.status(201).json({
        message: 'Create successful'
    });
}

export const updateAddress = async ( req: Request, res: Response) => {
    try {
        const address = req.body;
        await prismaClient.address.update({
             where: {
                id: +req.params.id
            },
            data: address
        })
        res.status(200).json({
            message: 'Update successful'
        });
    } catch(error) {
        throw  new  NotFoundException('Address not found!', ErrorCode.NOT_FOUND)
    }
}

export const getListAddressByUser = async ( req: Request, res: Response) => {
        const address = await prismaClient.address.findMany({
            where: {
                userId: +req.user.id
            }
        })
        res.status(200).json({
            data: address
        });
}

export const deleteAddress = async ( req: Request, res: Response) => {
    try {
        const address = await prismaClient.address.findUnique({
            where: {
              id: +req.params.id,
              userId: req.user.id
            }
        });
        if (!address) {
            throw  new  NotFoundException('Address not found!', ErrorCode.NOT_FOUND)
        }
        await prismaClient.address.delete({
            where: {
               id: +address.id
           }
        })
        res.status(200).json({
            message: 'Delete successful'
        });
    } catch(error) {
        throw  new  NotFoundException('Address not found!', ErrorCode.NOT_FOUND)
    }
}

export  const getListUsers = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) - 1;
    const skip =  page || 0;
    const take = parseInt(req.query.limit as string) || 5;
    const users = await prismaClient.user.findMany({
        skip,
        take,
        orderBy: { name: 'asc' }
    })
    res.status(200).json({
        data: users
    });
}

export  const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await prismaClient.user.findFirstOrThrow({
            where: {
                id: +req.params.id
            },
            include: {
                addresses: true,
            }
        })
        res.status(200).json({
            data: user
        });
    } catch (error) {
        throw  new NotFoundException('User not found!', ErrorCode.NOT_FOUND);
    }
}

export  const getUserByIdViewOrders = async (req: Request, res: Response) => {
    try {
        const user = await prismaClient.user.findFirstOrThrow({
            where: {
                id: +req.params.id
            },
            include: {
                orders: true,
                cartItems: true
            }
        })
        res.status(200).json({
            data: user
        });
    } catch (error) {
        throw  new NotFoundException('User not found!', ErrorCode.NOT_FOUND);
    }
}

export const updateUser = async ( req: Request, res: Response) => {
    const validated = req.body;
    try{
        let shippingAddress;
        let billingAddress;
        if(validated.defaultShippingAddress) {

            shippingAddress = await prismaClient.address.findFirstOrThrow({
                where: {
                    id: validated.defaultShippingAddress
                }
            })
            if (shippingAddress.userId != req.user.id){
                throw  new  NotFoundException('Address does not belong ot user!', ErrorCode.NOT_FOUND)
            }
        }
        if(validated.defaultBillingAddress) {
            billingAddress = await prismaClient.address.findFirstOrThrow({
                where: {
                    id: validated.defaultBillingAddress
                }
            })
            if (billingAddress.userId != req.user.id){
                throw  new  NotFoundException('Address does not belong ot user!', ErrorCode.NOT_FOUND)
            }
        }
        const up = await prismaClient.user.update({
            where: {
                id: +req.user.id
            },
            data: validated
        });
        res.status(200).json({
            message: 'Update successful',
            data: up
        });
    } catch(error) {
        throw  new  NotFoundException('Address not found!', ErrorCode.NOT_FOUND)
    }
}


export  const changeUserRole = async (req: Request, res: Response) => {
    try {
        const user = await prismaClient.user.update({
            where: {
                id: +req.params.id
            },
            data: {
                role: req.body.role
            }
        });
        res.status(200).json({
            message: 'Update Role user successful',
            data: user
        });
    } catch (error) {
        throw  new  NotFoundException('Address not found!', ErrorCode.NOT_FOUND)
    }
}