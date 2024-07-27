import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import {errorHandler, errorHandlerRetrun} from "../middlewares/error-handler";
import {cancelOrder, createOrder, getListOrders, getOneOrderById} from "../controllers/orders";

const ordersRoutes: Router = Router();

ordersRoutes.post('/', [authMiddleware], errorHandler({method: createOrder}))
ordersRoutes.get('/', [authMiddleware], errorHandler({method: getListOrders}))
ordersRoutes.get('/:id', [authMiddleware], errorHandler({method: getOneOrderById}))
ordersRoutes.patch('/:id/cancel', [authMiddleware], errorHandler({method: cancelOrder}))

export  default  ordersRoutes;


/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management
 */

// Create Order
/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     responses:
 *       "201":
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Create successful
 *                 order:
 *                   $ref: '#/components/schemas/Order'
 *       "400":
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cart is empty!"
 *       "404":
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Please update your address!"
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get list of orders for the authenticated user
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: List of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 datas:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 */

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 */

/**
 * @swagger
 * /orders/{id}/cancel:
 *   patch:
 *     summary: Cancel an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order canceled
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Order cancel!
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 */
