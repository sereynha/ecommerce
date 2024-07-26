import { Router } from "express";
import {
    createProduct,
    deleteProduct,
    getListProduct,
    getOneProduct,
    getProductByCategories,
    updateProduct
} from "../controllers/products";
import authMiddleware from "../middlewares/auth";
import {CreateProduct} from "../schema/products";
import adminMiddleware from "../middlewares/admin";
import { errorHandler } from "../middlewares/error-handler";

const productsRoutes: Router = Router();

productsRoutes.post('/', [ authMiddleware, adminMiddleware], errorHandler({method: createProduct, schema: CreateProduct}));
productsRoutes.get('/', [ authMiddleware], errorHandler({method: getListProduct}));
productsRoutes.get('/:id', [ authMiddleware], errorHandler({method: getOneProduct}));
productsRoutes.get('/categories/:id', [ authMiddleware], errorHandler({method: getProductByCategories}));
productsRoutes.patch('/:id', [ authMiddleware, adminMiddleware], errorHandler({method: updateProduct}));
productsRoutes.delete('/:id', [ authMiddleware, adminMiddleware], errorHandler({method: deleteProduct}));

export  default productsRoutes;