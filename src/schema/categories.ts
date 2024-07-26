import { z } from "zod";

export const CreateCategories = z.object({
    name: z.string()
})