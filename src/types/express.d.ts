import { User as PrismaUser} from '@prisma/client';
import 'express';

declare global {
    namespace Express {
      interface Request {
        user: PrismaUser;
      }
    }
  }
declare module 'express-serve-static-core' {
    interface Response {
        sendResponse?: (body?: any) => this;
    }
}