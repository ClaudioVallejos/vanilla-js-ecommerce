import dotenv from 'dotenv';

dotenv.config();
//Se declara que parte del .env se usará
export default {
    MONGODB_URL: process.env.MONGODB_URL,
    JWT_SECRET: process.env.JWT_SECRET
};