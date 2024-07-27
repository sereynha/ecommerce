import { z } from "zod";

export const CreateCategoriesShema = z.object({
    name: z.string()
})