import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export default  interface JwtPayloads {
    userId: number;
}

export type ErrorHandler<T extends ZodSchema<any>> = {
    method: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    schema?: T;
}