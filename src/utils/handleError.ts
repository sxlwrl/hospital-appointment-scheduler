import { AlreadyExistsError } from '../errors/AlreadyExists.error';
import { InvalidCredentialsError } from '../errors/InvalidCredentials.error';
import { NotFoundError } from '../errors/NotFound.error';

import { Response } from 'express';

export const handleError = function (res: Response, error: unknown): Response {
  if (
    error instanceof AlreadyExistsError ||
    error instanceof InvalidCredentialsError ||
    error instanceof NotFoundError
  ) {
    return res.status(error.code).json({ message: error.message });
  }

  if (error instanceof Error) {
    return res.status(400).json({ message: 'An unexpected error occurred' });
  }

  return res.status(500).json({ message: 'Unknown error occurred' });
};
