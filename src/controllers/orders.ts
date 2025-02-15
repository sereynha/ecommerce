import {NextFunction, Request, Response} from "express";
import { Decimal } from "@prisma/client/runtime/library";
import {BadRequestsException} from "../expections/bad-requests";
import {ErrorCode} from "../expections/root";
import {NotFoundException} from "../expections/not-found";
import {prismaClient} from "../config/prisma-client";

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    await prismaClient.$transaction(async(prisma) => {
        const shillingAddress = req.user.defaultShippingAddress;
        const cartItems = await prisma.cartItem.findMany({
            where: {
                userId: req.user.id
            },
            include: {
                product: true
            }
        })
        if (cartItems.length === 0) {
            return res.json({message: "Cart is empty!"});
        }
        const price = cartItems.reduce((prev, current) => {
            return prev + current.quantity * (current.product.price as Decimal).toNumber();
        }, 0);
        if(!shillingAddress){
            throw new BadRequestsException('Please update user add your address!',ErrorCode.NOT_FOUND);
        }
        const address = await prisma.address.findFirst({
            where: {
              id: shillingAddress
            },
        });
          const order = await prisma.order.create({
            data: {
              userId: req.user.id,
              amount: price,
              address: address?.formattedAddress,
              details: {
                create: cartItems.map((cart) => ({
                  productId: cart.productId,
                  quantity: cart.quantity,
                })),
              },
            },
          });
        const orderEvent = await prisma.orderEvent.create({
            data: {
                orderId: order.id,
            }
        })
        await prisma.cartItem.deleteMany({
            where: {
                userId: req.user.id
            }
        })
        res.status(201).json({
            message: 'Create successful',
            order: order
        });
    })
}

export const getListOrders = async (req: Request, res: Response) => {
    const orders = await prismaClient.order.findMany({
        where: {
            userId: req.user.id
        }
    })
    res.status(200).json({
        datas: orders
    });
}

export const getOneOrderById = async (req: Request, res: Response) => {
    try {
        const order = await prismaClient.order.findFirstOrThrow({
            where: {
                id: +req.params.id
            },
            include: {
                details: true,
                event: true
            }
        })
        res.status(200).json({
            data: order
        });
    } catch(error) {
        throw new NotFoundException('Order not found!', ErrorCode.NOT_FOUND);
    }
}
export const getListAllOrdersByStatus = async (req: Request, res: Response) => {
    let clauseData = {};
    const status = req.query.status as string;
    const page = parseInt(req.query.page as string) - 1;
    const skip =  page || 0;
    const take = parseInt(req.query.limit as string) || 5;
    if(status) {
        clauseData = {
            status
        }
    }
    console.log("Data :"+clauseData)
    const orders = await prismaClient.order.findMany({
        where: clauseData,
        skip: skip,
        take: take,
    });
    res.status(200).json({
        datas: orders
    });
}

export  const getListUserOrders = async (req: Request, res: Response) => {
    const status = req.query.status
    const page = parseInt(req.query.page as string) - 1;
    const skip =  page || 0;
    const take = parseInt(req.query.limit as string) || 5;
    let clause: any = {
        userId: +req.params.id
    };
    if(status) {
        clause = {
            ...clause,
            status
        }
    }
    const orders = await prismaClient.order.findMany({
        where: clause,
        skip: skip,
        take: take
    })
    res.status(200).json({
        datas: orders
    });
}

export const cancelOrder = async (req: Request, res: Response) => {
    try {
        const order = await prismaClient.order.update({
            where: {
                id: +req.params.id
            },
            data: {
                status: 'CANCELLED'
            }
        })
         await prismaClient.orderEvent.create({
            data: {
                orderId: order.id,
                status: 'CANCELLED'
            }
        })
        res.status(200).json({
            message: 'Order cancel!',
            data: order
        });
    } catch(error) {
        throw new NotFoundException('Order not found!', ErrorCode.NOT_FOUND);
    }
}

export const updateStatus = async (req: Request, res: Response) => {
    try {
        const order = await prismaClient.order.update({
            where: {
                id: +req.params.id
            },
            data: {
                status: req.body.status
            }
        })
        await prismaClient.orderEvent.create({
            data: {
                orderId: order.id,
                status: order.status
            }
        })
        res.status(200).json({
            message: 'Order Status Update!',
            data: order
        });
    } catch(error) {
        throw new NotFoundException('Order not found!', ErrorCode.NOT_FOUND);
    }
}