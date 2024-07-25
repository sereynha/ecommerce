import {app} from './app';
import {PORT} from "./utils/secret";
import {PrismaClient} from '@prisma/client'

const appRun = app();
export const prismaClient = new PrismaClient({
    log: ['query']
})


appRun.listen(PORT,() => {console.log(`Server is running on port ${PORT} !`)})