import dotenv from 'dotenv';

dotenv.config({path:'.env'})

export  const PORT = process.env.PORT || 3000;
export  const  JWT_SECRET_KEY = process.env.JWT_SECRET_KEY!; //can't be null
export  const  JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN!; //can't be null