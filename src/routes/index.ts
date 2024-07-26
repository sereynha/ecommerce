import {Router} from "express";
import auths from "./auth";
import productsRoutes from "./products";
import userRoutes from "./users";
import categories from "./categories";
import cartRoutes from "./cart";


const rootRouter: Router = Router();

rootRouter.use('/auth',auths)
rootRouter.use('/products',productsRoutes)
rootRouter.use('/address',userRoutes)
rootRouter.use('/categories',categories)
rootRouter.use('/carts',cartRoutes)

export  default  rootRouter;