import { z } from "zod";

export const CreateItemToCartShema = z.object({
    productId: z.number(),
    quantity: z.number()
})

export const UpdateQuanttitySchema = z.object({
    quantity: z.number()
})