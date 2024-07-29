import dotenv from 'dotenv';

dotenv.config({path:'.env'})

export  const PORT = process.env.PORT || 3000;
export  const  JWT_SECRET_KEY = process.env.JWT_SECRET_KEY!;
export  const  JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN!;
export  const  URL_API = process.env.URL_API!;
export  const  RIPOSITORIES = process.env.RIPOSITORIES!;
export  const   NAME_PROJECT = process.env.NAME_PROJECT!;
export  const   REDIS_HOST = process.env.REDIS_HOST;
export  const   REDIS_PORT = parseInt(process.env.REDIS_PORT || '6379', 10);
