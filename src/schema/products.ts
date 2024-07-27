import { z } from "zod";

export const CreateProductShema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    price: z.number().positive("Price must be positive"),
    tags: z.array(z.string()),
    categoryId: z.number().int().positive()
})

export const UpdateProductShema = z.object({
    name: z.string().min(1, "Name is required").optional(),
    description: z.string().min(1, "Description is required").optional(),
    price: z.number().positive("Price must be positive").optional(),
    stock: z.number().positive("Stock must be positive").optional(),
    tags: z.array(z.string()).optional(),
    categoryId: z.number().int().positive().optional()
})