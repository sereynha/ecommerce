import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import {errorHandler} from "../middlewares/error-handler";
import {createCategories, deleteCategories, getListCategories, getOneCategories} from "../controllers/categories";
import {CreateCategoriesShema} from "../schema/categories";
import adminMiddleware from "../middlewares/admin";
import {cacheMiddleware, clearCacheMiddleware} from "../middlewares/cache";


const categoriesRoutes: Router = Router();

categoriesRoutes.post('/', [authMiddleware, adminMiddleware, clearCacheMiddleware], errorHandler({method: createCategories, schema: CreateCategoriesShema}));
categoriesRoutes.get('/', [authMiddleware, cacheMiddleware], errorHandler({ method: getListCategories}));
categoriesRoutes.get('/:id', [authMiddleware, cacheMiddleware], errorHandler({ method: getOneCategories}));
categoriesRoutes.delete('/:id', [authMiddleware, adminMiddleware, clearCacheMiddleware], errorHandler({ method: deleteCategories}));

export default categoriesRoutes;


/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Categories management
 */

// Create Category
/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *             example:
 *               name: Girl
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
 *       "400":
 *         description: Category already exists
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get the list of categories
 *     tags: [Categories]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 5
 *         description: The number of items per page
 *     responses:
 *       "200":
 *         description: The list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get a single category by id
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The category id
 *     responses:
 *       "200":
 *         description: The category description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       "404":
 *         description: Category not found
 */

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category by id
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The category id
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
 *         description: Category not found
 */