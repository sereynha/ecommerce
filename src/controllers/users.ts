import { Request, Response } from 'express'
import {NotFoundException} from "../expections/not-found";
import {ErrorCode} from "../expections/root";
import {prismaClient} from "../index";

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
        throw  new  NotFoundException('Address Not found!', ErrorCode.NOT_FOUND)
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
            throw  new  NotFoundException('Address Not found!', ErrorCode.NOT_FOUND)
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
        throw  new  NotFoundException('Address Not found!', ErrorCode.NOT_FOUND)
    }
}
