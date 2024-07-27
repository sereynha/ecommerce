import {app} from './app';
import {PORT} from "./utils/secret";
import {PrismaClient} from '@prisma/client'

const appRun = app();
export const prismaClient = new PrismaClient({
    log: ['query']
}).$extends({
    result: {
        address: {
            formattedAddress: {
                needs: {
                    line: true,
                    city: true,
                    country: true,
                    pincode: true
                },
                compute: (addresses) => {
                    return `${addresses.line}, ${addresses.city}, ${addresses.country}, ${addresses.pincode}`
                }
            }
        }
    }
})


appRun.listen(PORT,() => {console.log(`Server is running on port ${PORT} !`)})