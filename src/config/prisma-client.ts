import {PrismaClient} from '@prisma/client'

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
    