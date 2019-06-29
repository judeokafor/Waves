import dotenv from 'dotenv';

dotenv.config();

export default {
  DATABASE_URL: process.env.DATABASE_URL,
  SECRET_KEY: process.env.SECRET_KEY,
  SALT: process.env.SALT,
};
