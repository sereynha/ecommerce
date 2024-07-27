import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import {errorHandler} from "../middlewares/error-handler";
import {createItemToCart, deleteItemFromCart, getItemCart, updateQuanlityToCart} from "../controllers/cart";
import {CreateItemToCartShema, UpdateQuanttitySchema} from "../schema/cart";


const cartRoutes: Router = Router();

cartRoutes.post('/', [authMiddleware], errorHandler({method: createItemToCart, schema: CreateItemToCartShema}))
cartRoutes.get('/', [authMiddleware], errorHandler({method: getItemCart}))
cartRoutes.patch('/:id', [authMiddleware], errorHandler({method: updateQuanlityToCart, schema: UpdateQuanttitySchema}))
cartRoutes.delete('/:id', [authMiddleware], errorHandler({method: deleteItemFromCart}))

export default cartRoutes;

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Cart management
 */
// Create Item to Cart
/**
 * @swagger
 * /carts:
 *   post:
 *     summary: Add an item to the cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *                 minimum: 1
 *             example:
 *               productId: 1
 *               quantity: 2
 *     responses:
 *       "201":
 *         description: Create successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Create successful"
 *                 success:
 *                   type: boolean
 *                   example: true
 *       "404":
 *         $ref: '#/components/responses/ProductNotFound'
 */

/**
 * @swagger
 * /carts:
 *   get:
 *     summary: Retrieve cart items for the logged-in user
 *     tags: [Cart]
 *     responses:
 *       "200":
 *         description: Successful response with cart items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CartItem'
 */

/**
 * @swagger
 * /carts/{id}:
 *   patch:
 *     summary: Update the quantity of an item in the cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the cart item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: integer
 *                 minimum: 1
 *             example:
 *               quantity: 3
 *     responses:
 *       "201":
 *         description: Update successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Update successful"
 *                 success:
 *                   type: boolean
 *                   example: true
 *       "404":
 *         $ref: '#/components/responses/CartItemNotFound'
 */

/**
 * @swagger
 * /carts/{id}:
 *   delete:
 *     summary: Delete an item from the cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the cart item
 *     responses:
 *       "201":
 *         description: Delete successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Delete successful"
 *                 success:
 *                   type: boolean
 *                   example: true
 *       "404":
 *         $ref: '#/components/responses/CartItemNotFound'
 */

