import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';

const app = express();
const PORT = 3000;

app.use(json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send('Hello World!');
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server has been started on PORT: ${PORT}`);
});
