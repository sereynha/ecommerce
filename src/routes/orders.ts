import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import {errorHandler} from "../middlewares/error-handler";
import {
    cancelOrder,
    createOrder,
    getListAllOrdersByStatus,
    getListOrders,
    getListUserOrders,
    getOneOrderById,
    updateStatus
} from "../controllers/orders";
import adminMiddleware from "../middlewares/admin";
import {cacheMiddleware, clearCacheMiddleware} from "../middlewares/cache";

const ordersRoutes: Router = Router();

ordersRoutes.post('/', [authMiddleware, clearCacheMiddleware], errorHandler({method: createOrder}))
ordersRoutes.get('/', [authMiddleware, cacheMiddleware], errorHandler({method: getListOrders}))
ordersRoutes.get('/:id', [authMiddleware, cacheMiddleware], errorHandler({method: getOneOrderById}))
ordersRoutes.get('/status/index', [authMiddleware, adminMiddleware, cacheMiddleware], errorHandler({method: getListAllOrdersByStatus}))
ordersRoutes.get('/users/:id', [authMiddleware, adminMiddleware, cacheMiddleware], errorHandler({method: getListUserOrders}))
ordersRoutes.patch('/:id/cancel', [authMiddleware, clearCacheMiddleware], errorHandler({method: cancelOrder}))
ordersRoutes.patch('/:id/status', [authMiddleware, adminMiddleware, clearCacheMiddleware], errorHandler({method: updateStatus}))

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
// Get List Orders
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
// Get Orders By ID
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
// Get List Orders By Status
/**
 * @swagger
 * /orders/status/index:
 *   get:
 *     summary: Get list of all orders
 *     tags: [Orders]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 5
 *         description: Number of orders to return per page
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           default: "PENDING"
 *         description: Status of the orders
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
 *       404:
 *         description: Orders not found
 */

// Get Order By User
/**
 * @swagger
 * /users/{id}/orders:
 *   get:
 *     summary: Get all orders for a specific user
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           default: 1
 *         description: User ID
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 5
 *         description: Number of orders to return per page
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           default: "CANCELLED"
 *         description: Status of the orders
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
 *       404:
 *         description: Orders not found
 */

/**
 * @swagger
 * /orders/users/{id}:
 *   get:
 *     summary: Get a specific order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Order ID
 *     responses:
 *       200:
 *         description: An order object
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
/**
 * @swagger
 * /orders/{id}/status:
 *   patch:
 *     summary: Update order status
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *             example:
 *               status: "ACCEPTED"
 *     responses:
 *       200:
 *         description: Order status updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Order Status Update!
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 */
