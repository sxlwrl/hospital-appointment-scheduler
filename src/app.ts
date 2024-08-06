import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { join } from 'path';

import { AuthRouter } from './api/auth/auth.router';

dotenv.config({ path: join(__dirname, '../.env') });

const app = express();

app.use(json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

const pool = new Pool({
  user: process.env.DB_USER,
  host: 'localhost',
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  database: 'hospital',
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: err.message });
});

app.use('/api/v1', new AuthRouter(pool).router);

export default app;
