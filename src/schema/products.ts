import { z } from "zod";

export const CreateProduct = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    price: z.number().positive("Price must be positive"),
    tags: z.array(z.string()),
    categoryId: z.number().int().positive()
})