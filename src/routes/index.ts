import {Router} from "express";
import auths from "./auth";
import productsRoutes from "./products";
import userRoutes from "./users";
import categories from "./categories";


const rootRouter: Router = Router();

rootRouter.use('/auth',auths)
rootRouter.use('/product',productsRoutes)
rootRouter.use('/address',userRoutes)
rootRouter.use('/categories',categories)

export  default  rootRouter;