import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";
import {errorHandler} from "../middlewares/error-handler";
import {
    changeUserRole,
    createAddress,
    deleteAddress,
    getListAddressByUser,
    getListUsers,
    getUserById,
    getUserByIdViewOrders,
    updateAddress,
    updateUser
} from "../controllers/users";
import {CreateAddressSchema, UpdateUserSchema} from "../schema/users";
import {cacheMiddleware, clearCacheMiddleware} from "../middlewares/cache";


const userRoutes: Router = Router();

userRoutes.post('/addresses',[authMiddleware, clearCacheMiddleware],errorHandler({method: createAddress, schema: CreateAddressSchema}));
userRoutes.get('/addresses',[authMiddleware, cacheMiddleware],errorHandler({method: getListAddressByUser}));
userRoutes.patch('/addresses/:id',[authMiddleware,clearCacheMiddleware],errorHandler({method: updateAddress}));
userRoutes.delete('/addresses/:id',[authMiddleware,clearCacheMiddleware],errorHandler({method: deleteAddress}));
userRoutes.put('/',[authMiddleware,clearCacheMiddleware],errorHandler({method: updateUser, schema: UpdateUserSchema}));
userRoutes.get('/',[authMiddleware,adminMiddleware,cacheMiddleware],errorHandler({method: getListUsers}));
userRoutes.put('/:id/role',[authMiddleware,adminMiddleware,clearCacheMiddleware],errorHandler({method: changeUserRole}));
userRoutes.get('/:id',[authMiddleware,adminMiddleware,cacheMiddleware],errorHandler({method: getUserById}));
userRoutes.get('/:id/orders',[authMiddleware,adminMiddleware,cacheMiddleware],errorHandler({method: getUserByIdViewOrders}));

export default  userRoutes;

/**
 * @swagger
 * tags:
 *   - name: User
 *     description: User management
 *   - name: Addresses
 *     description: Address management
 */

// Create Address
/**
 * @swagger
 * /users/addresses:
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
 * /users/addresses:
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
 * /users/addresses/{id}:
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
 * /users/addresses/{id}:
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
 * /users:
 *   put:
 *     summary: Update user information
 *     tags: [User]
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

// Get List of Users
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get list of users
 *     tags: [User]
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
 *         description: Number of users per page
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

// Update Role
/**
 * @swagger
 * /users/{id}/role:
 *   put:
 *     summary: Change user role
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *             example:
 *               role: "ADMIN"
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

// Get User By Id
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
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

// Get User By Id View Orders
/**
 * @swagger
 * /users/{id}/orders:
 *   get:
 *     summary: Get user by ID with orders
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
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