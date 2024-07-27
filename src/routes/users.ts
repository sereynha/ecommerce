import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";
import {errorHandler} from "../middlewares/error-handler";
import {createAddress, deleteAddress, getListAddressByUser, updateAddress, updateUser} from "../controllers/users";
import {CreateAddressSchema, UpdateUserSchema} from "../schema/users";


const userRoutes: Router = Router();

userRoutes.post('/',[authMiddleware],errorHandler({method: createAddress, schema: CreateAddressSchema}));
userRoutes.get('/user',[authMiddleware],errorHandler({method: getListAddressByUser}));
userRoutes.patch('/:id',[authMiddleware],errorHandler({method: updateAddress}));
userRoutes.delete('/:id',[authMiddleware],errorHandler({method: deleteAddress}));
userRoutes.put('/user',[authMiddleware],errorHandler({method: updateUser, schema: UpdateUserSchema}));

export default  userRoutes;

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User management
 *   - name: Addresses
 *     description: Address management
 */

// Create Address
/**
 * @swagger
 * /addresses:
 *   post:
 *     summary: Create a new address
 *     tags: [Addresses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - line
 *               - city
 *               - country
 *               - pincode
 *               - userId
 *             properties:
 *               line:
 *                 type: string
 *               city:
 *                 type: string
 *               country:
 *                 type: string
 *               pincode:
 *                 type: string
 *               userId:
 *                 type: number
 *             example:
 *               line: "12 tuol touk"
 *               city: "phnom penh"
 *               country: "cambodia"
 *               pincode: "123456"
 *               userId: 1
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
 */

// Get Addresses by User
/**
 * @swagger
 * /addresses/user:
 *   get:
 *     summary: Get the list of addresses for the authenticated user
 *     tags: [Addresses]
 *     responses:
 *       "200":
 *         description: The list of addresses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Address'
 */

// Update Address
/**
 * @swagger
 * /addresses/{id}:
 *   patch:
 *     summary: Update an existing address
 *     tags: [Addresses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The address id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               line:
 *                 type: string
 *               city:
 *                 type: string
 *               country:
 *                 type: string
 *               pincode:
 *                 type: string
 *               userId:
 *                 type: number
 *             example:
 *               line: "19 tk"
 *               city: "battambang"
 *               country: "cambodia"
 *               pincode: "123456"
 *               userId: 1
 *     responses:
 *       "200":
 *         description: Update successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Update successful"
 *       "404":
 *         $ref: '#/components/responses/NotFoundException'
 */


// Delete Address
/**
 * @swagger
 * /addresses/{id}:
 *   delete:
 *     summary: Delete an address by id
 *     tags: [Addresses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The address id
 *     responses:
 *       "200":
 *         description: Delete successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Delete successful"
 *       "404":
 *         $ref: '#/components/responses/NotFoundException'
 */

// Update User
/**
 * @swagger
 * /addresses/user:
 *   put:
 *     summary: Update user information
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               defaultShippingAddress:
 *                 type: integer
 *               defaultBillingAddress:
 *                 type: integer
 *             example:
 *               name: "Meng"
 *               defaultShippingAddress: 1
 *               defaultBillingAddress: 2
 *     responses:
 *       "200":
 *         description: Update successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Update successful"
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       "404":
 *         $ref: '#/components/responses/NotFoundException'
 */
