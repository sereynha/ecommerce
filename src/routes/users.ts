import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";
import {errorHandler} from "../middlewares/error-handler";
import {createAddress, deleteAddress, getListAddressByUser, updateAddress} from "../controllers/users";
import {CreateAddressSchema} from "../schema/users";


const userRoutes: Router = Router();

userRoutes.post('/',[authMiddleware],errorHandler({method: createAddress, schema: CreateAddressSchema}));
userRoutes.patch('/:id',[authMiddleware],errorHandler({method: updateAddress}));
userRoutes.get('/user',[authMiddleware],errorHandler({method: getListAddressByUser}));
userRoutes.delete('/:id',[authMiddleware],errorHandler({method: deleteAddress}));

export default  userRoutes;