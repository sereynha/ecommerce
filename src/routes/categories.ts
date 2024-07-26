import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import {errorHandler} from "../middlewares/error-handler";
import {createCategories, deleteCategories, getListCategories, getOneCategories} from "../controllers/categories";
import {CreateCategories} from "../schema/categories";
import adminMiddleware from "../middlewares/admin";


const categoriesRoutes: Router = Router();

categoriesRoutes.post('/', [authMiddleware, adminMiddleware], errorHandler({method: createCategories, schema: CreateCategories}));
categoriesRoutes.get('/', [authMiddleware], errorHandler({ method: getListCategories}));
categoriesRoutes.get('/:id', [authMiddleware], errorHandler({ method: getOneCategories}));
categoriesRoutes.delete('/:id', [authMiddleware, adminMiddleware], errorHandler({ method: deleteCategories}));

export default categoriesRoutes;