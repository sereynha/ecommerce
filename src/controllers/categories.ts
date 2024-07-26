import { Request, Response } from 'express'
import {prismaClient} from "../index";
import { BadRequestsException } from '../expections/bad-requests';
import { ErrorCode } from '../expections/root';
import { NotFoundException } from '../expections/not-found';

export const createCategories = async ( req: Request, res: Response) => {
    const { name } = req.body;
    const categories = await prismaClient.category.findFirst({
        where: { name: name }
    })
    if (categories) {
        throw new  BadRequestsException('Category Not Fount!',ErrorCode.ALLREADY_EXISTS);
    }
    await prismaClient.category.create({
        data: {
            name: name
        }
    })
    res.status(201).json({
        message: 'Create successful'
    });
}

export const getListCategories = async ( req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) - 1;
    const skip =  page || 0;
    const take = parseInt(req.query.limit as string) || 5;
    const  categories = await prismaClient.category.findMany({
        skip,
        take,
        orderBy: { createdAt: 'desc' }
    })
    res.status(200).json({
        data: categories
    });
}

export const getOneCategories = async ( req: Request, res: Response) => {
    try {
        const categorie = await prismaClient.category.findFirstOrThrow({
            where: {
                id: +req.params.id
            }
        })
        res.status(200).json({
            data: categorie
        });
    } catch (error) {
        throw  new  NotFoundException('Category Not found!', ErrorCode.NOT_FOUND)
    }
}

export const deleteCategories = async ( req: Request, res: Response) => {
    try {
        const categorie = await prismaClient.category.delete({
            where: {
                id: +req.params.id
            }
        })
        res.status(200).json({
            message: 'Delete successful'
        });
    } catch (error) {
        throw  new  NotFoundException('Category Not found!', ErrorCode.NOT_FOUND)
    }
}
