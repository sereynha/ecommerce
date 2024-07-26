import { Request, Response} from "express";
import {prismaClient} from "../index";
import {NotFoundException} from "../expections/not-found";
import {ErrorCode} from "../expections/root";


export const createProduct = async (req:Request, res:Response) => {
    const product = await prismaClient.product.create({
        data: {
            ...req.body,
            tags: req.body.tags.join(',')
        }
    })
    res.status(201).json({
        message: 'Create successful',
        productId: product.id,
    });
}

export const updateProduct = async (req:Request, res:Response) => {
    try {
        const pro = req.body;
        if ( pro.tags) {
            pro.tags = pro.tags.join(',');
        }
        const  update = await prismaClient.product.update({
            where: {
                id: +req.params.id
            },
            data: pro
        })
        res.status(200).json({
            message: 'Update successful',
            productId: update.id,
        });
    } catch (error) {
        throw  new  NotFoundException('Product Not found!', ErrorCode.NOT_FOUND)
    }
}

export const getOneProduct = async (req:Request, res:Response) => {
    try {
        const product = await prismaClient.product.findFirstOrThrow({
            where: {
                id: +req.params.id
            }
        })
        res.status(200).json({
            data: product,
        });
    } catch (error) {
        throw  new  NotFoundException('Product Not found!', ErrorCode.NOT_FOUND)
    }
}

export const getListProduct = async (req:Request, res:Response) => {
    const count = await prismaClient.product.count();
    const page = parseInt(req.query.page as string) - 1;
    const skip =  page || 0;
    const take = parseInt(req.query.limit as string) || 5;
    const products = await prismaClient.product.findMany({
        skip,
        take,
        orderBy: { createdAt: 'desc' }
    })
    res.status(200).json({
        count,
        data: products
    });
}
export const getProductByCategories = async (req:Request, res:Response) => {
    try {
        const categoryId = +req.params.id;
        const products = await prismaClient.product.findMany({
            where: {
              categoryId: categoryId,
            }
        });
        res.status(200).json({
            data: products,
        });
    } catch (error) {
        throw  new  NotFoundException('Product Not found!', ErrorCode.NOT_FOUND)
    }
}

export const deleteProduct = async (req:Request, res:Response) => {
    try {
        await prismaClient.product.delete({
            where: {
                id: +req.params.id
            }
        })
        res.status(200).json({
            message: 'Delete successful'
        });
    } catch (error) {
        throw  new  NotFoundException('Product Not found!', ErrorCode.NOT_FOUND)
    }
}