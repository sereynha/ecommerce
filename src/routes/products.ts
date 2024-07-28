import { Router } from "express";
import {
    createProduct,
    deleteProduct,
    getListProduct,
    getOneProduct,
    getProductByCategories,
    searchProducts,
    updateProduct
} from "../controllers/products";
import authMiddleware from "../middlewares/auth";
import {CreateProductShema, UpdateProductShema} from "../schema/products";
import adminMiddleware from "../middlewares/admin";
import { errorHandler } from "../middlewares/error-handler";

const productsRoutes: Router = Router();

productsRoutes.post('/', [ authMiddleware, adminMiddleware], errorHandler({method: createProduct, schema: CreateProductShema}));
productsRoutes.get('/', [ authMiddleware], errorHandler({method: getListProduct}));
productsRoutes.get('/:id', [ authMiddleware], errorHandler({method: getOneProduct}));
productsRoutes.get('/categories/:id', [ authMiddleware], errorHandler({method: getProductByCategories}));
productsRoutes.get('/search/text', [authMiddleware], errorHandler({method: searchProducts}))
productsRoutes.patch('/:id', [ authMiddleware, adminMiddleware], errorHandler({method: updateProduct, schema: UpdateProductShema}));
productsRoutes.delete('/:id', [ authMiddleware, adminMiddleware], errorHandler({method: deleteProduct}));

export  default productsRoutes;


/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: Products management
 */

// Create Product
/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - tags
 *               - categoryId
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *                 format: float
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               categoryId:
 *                 type: integer
 *             example:
 *               name: Cross Training T-Shirt
 *               description: Model is 173 cm tall / 65 kg weight and is wearing size M.
 *               price: 8.69
 *               tags: ["T-Shirt", "clothing"]
 *               categoryId: 1
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
 *                 productId:
 *                   type: integer
 *       "400":
 *         description: Bad request
 */

// Get Product by ID
/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a single product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product id
 *     responses:
 *       "200":
 *         description: The product description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       "404":
 *         $ref: '#/components/responses/ProductNotFound'
 */

// Get List of Products
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get the list of products
 *     tags: [Products]
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
 *         description: The list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

// Get Products by Category
/**
 * @swagger
 * /products/categories/{id}:
 *   get:
 *     summary: Get products by category id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The category id
 *     responses:
 *       "200":
 *         description: List of products in the category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       "404":
 *         $ref: '#/components/responses/ProductNotFound'
 */

// Search Product
/**
 * @swagger
 * /products/search/text:
 *   get:
 *     summary: Search for products
 *     description: Search for products by name, description, or tags
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: params
 *         schema:
 *           type: string
 *         required: true
 *         description: The search parameter
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 datas:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       404:
 *         description: Products not found
 */

// Update Product
/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     summary: Update an existing product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *                 format: float
 *               stock:
 *                 type: number
 *                 format: integer
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *             example:
 *               name: Cross Training T-Shirt
 *               description: Model is 173 cm tall / 65 kg weight and is wearing size M.
 *               price: 8.69
 *               stock:  20
 *               tags: ["T-Shirt", "clothing", "updated"]
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
 *                 productId:
 *                   type: integer
 *       "404":
 *         $ref: '#/components/responses/ProductNotFound'
 */

// Delete Product
/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product id
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
 *         $ref: '#/components/responses/ProductNotFound'
 */
