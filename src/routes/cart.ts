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