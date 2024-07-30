import { NextFunction , Request , Response} from "express";
import { ErrorCode } from "../expections/root";
import { NotFoundException } from "../expections/not-found";
import { Product,CartItem } from '@prisma/client';
import {prismaClient} from "../config/prisma-client";

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
    if(product.stock < validated.quantity){
        throw  new  NotFoundException('Product Sock is not found!', ErrorCode.NOT_FOUND)
    }
    if(product.stock >= validated.quantity){
        product.stock = product.stock - validated.quantity;
    }
    await prismaClient.product.update({
        where: {
            id: product.id
        },
        data: {
            stock: product.stock
        }
    })
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
    let product: Product;
    let item: CartItem;
    let cartQuantity: number = 0;
    try {
         item = await prismaClient.cartItem.findFirstOrThrow({
            where: {
                id: +req.params.id
            }
        })
    } catch (error) {
        throw  new  NotFoundException('Item Cart not found!', ErrorCode.NOT_FOUND)
    }
    product = await prismaClient.product.findFirstOrThrow({
        where: {
            id: item.productId
        }
    })
    cartQuantity = req.body.quantity - item.quantity;
    if(product.stock < cartQuantity){
        throw  new  NotFoundException('Product Sock is not found!', ErrorCode.NOT_FOUND)
    }
    if(product.stock >= req.body.quantity){
         product.stock = product.stock - cartQuantity;
    }
    await prismaClient.product.update({
        where: {
            id: item.productId
        },
        data: {
            stock:  product.stock
        }
    });
    await prismaClient.cartItem.update({
        where: {
            id: +item.id
        },
        data: {
            quantity: req.body.quantity
        }
    });
    res.status(201).json({
        message: 'Update successful',
        success: true
    });
}

export const deleteItemFromCart = async (req:Request, res:Response) => {
    let item: CartItem;
    let product: Product;
    try {
         item = await prismaClient.cartItem.findFirstOrThrow({
            where: {
                id: +req.params.id
            }
        })
    } catch (error) {
        throw  new  NotFoundException('Item Cart not found!', ErrorCode.NOT_FOUND)
    }
    product = await prismaClient.product.findFirstOrThrow({
        where: {
            id: item.productId
        }
    })
    product.stock = product.stock + item.quantity;
    await prismaClient.product.update({
        where: {
            id: item.productId
        },
        data: {
            stock:  product.stock
        }
    });
    await prismaClient.cartItem.delete({
        where: {
            id: +item.id
        }
    })
    res.status(201).json({
        message: 'Delete successful',
        success: true
    });
}