/* eslint-disable prettier/prettier */
import * as dotenv from 'dotenv';

// server environment
export const SERVER_ENV = 'dev'; // dev, testing, staging, production
dotenv.config({ path: `./.env.${SERVER_ENV}` });

// // Server
export const SERVER_PORT = Number(process.env.SERVER_PORT);

console.log('SERVER_PORT: ', SERVER_PORT);
