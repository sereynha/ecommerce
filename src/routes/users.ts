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