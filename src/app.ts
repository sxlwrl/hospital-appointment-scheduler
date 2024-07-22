import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';

const app = express();

app.use(json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send('Hello World!');
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: err.message });
});

export default app;
