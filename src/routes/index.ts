import {Router} from "express";
import auths from "./auth";


const rootRouter: Router = Router();

rootRouter.use('/auth',auths)

export  default  rootRouter;