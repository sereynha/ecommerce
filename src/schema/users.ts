import {z} from "zod";

export const SignUpSchema = z.object({
    name: z.string().nonempty({ message:  "Name is required"}),
    email: z.string().email(),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' })
})
export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' })
})

export const CreateAddressSchema = z.object({
    line: z.string(),
    city: z.string().nonempty({ message: "City is required" }),
    country: z.string().nonempty({ message: "Country is required" }),
    pincode: z.string().min(6,{ message: "Pincode is required" }),
    userId: z.number()
})
