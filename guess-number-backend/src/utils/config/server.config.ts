/* eslint-disable prettier/prettier */
import * as dotenv from 'dotenv';

// server environment
export const SERVER_ENV = 'dev'; // dev, testing, staging, production
dotenv.config({ path: `./.env.${SERVER_ENV}` });

// // Server
export const SERVER_PORT = Number(process.env.SERVER_PORT);

export const GLOBAL_URL_PREFIX = '/api';

// DB
export enum ModuleNames {
  GAME = 'Game',
  PLAYER = 'Player',
  GAME_PLAYER = 'Game_Player',
}

export const DATABASE_HOST = process.env.DATABASE_HOST;
export const DATABASE_PORT = Number(process.env.DATABASE_PORT);
export const DATABASE_NAME = process.env.DATABASE_NAME;

// Player
export enum PlayerTypes {
  HUMAN = 'human',
  CPU = 'cpu',
}
