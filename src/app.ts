import swaggerUi from 'swagger-ui-express';
import express from 'express';
import cors from 'cors';
import rootRouter from "./routes";
import {PrismaClient} from '@prisma/client'
import {SignUpSchema} from "./schema/users";
import {errorMiddleWare} from "./middlewares/errors";
import {limiter} from "./config/rate-limit";

export function app (){
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use('/api', rootRouter);
    app.use(errorMiddleWare);
    app.use(limiter)
    return app;
}