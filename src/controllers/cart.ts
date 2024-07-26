import { NextFunction , Request , Response} from "express";
import { ErrorCode } from "../expections/root";
import { NotFoundException } from "../expections/not-found";
import { Product } from '@prisma/client';
import {prismaClient} from "../index";

export const createItemToCart = async (req:Request, res:Response) => {
    const validated = req.body;
    let product: Product;
    try {
        product = await prismaClient.product.findFirstOrThrow({
            where: {
                id: validated.productId
            }
        })
    } catch(error) {
         throw  new  NotFoundException('Product not found!', ErrorCode.NOT_FOUND)
    }
    await prismaClient.cartItem.create({
        data: {
            userId: req.user.id,
            productId: product.id,
            quantity: validated.quantity
        }
    })
    res.status(201).json({
        message: 'Create successful',
        success: true
    });
}

export const getItemCart = async (req:Request, res:Response) => {
    const item = await prismaClient.cartItem.findMany({
        where: {
            userId: req.user.id,
        },
        include: {
            product: true
        }
    })
    res.status(200).json({
        data: item
    });
}

export const updateQuanlityToCart = async (req:Request, res:Response) => {
    try {
        const validated = req.body;
        await prismaClient.cartItem.update({
            where: {
                id: +req.params.id
            },
            data: {
                quantity: validated.quantity
            }
        })
        res.status(201).json({
            message: 'Update successful',
            success: true
        });
    } catch (error) {
        throw  new  NotFoundException('Item Cart not found!', ErrorCode.NOT_FOUND)
    }
}

export const deleteItemFromCart = async (req:Request, res:Response) => {
    try {
        await prismaClient.cartItem.delete({
            where: {
                id: +req.params.id
            }
        })
        res.status(201).json({
            message: 'Delete successful',
            success: true
        });
    } catch (error) {
        throw  new  NotFoundException('Item Cart not found!', ErrorCode.NOT_FOUND)
    }
}