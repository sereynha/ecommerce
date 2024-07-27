import swaggerUi from 'swagger-ui-express';
import express from 'express'
import rootRouter from "./routes";
import {PrismaClient} from '@prisma/client'
import {SignUpSchema} from "./schema/users";
import {errorMiddleWare} from "./middlewares/errors";


export function app (){
    const app = express();
    app.use(express.json());
    app.use('/api', rootRouter);
    app.use(errorMiddleWare);
    return app;
}