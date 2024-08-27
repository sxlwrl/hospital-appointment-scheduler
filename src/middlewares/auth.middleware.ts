import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt';

/**
 * Middleware that checks if the user is authenticated, makes the routers secure
 *
 * @param req - request
 * @param res - response
 * @param next - next
 */

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.cookies.accessToken;

  if (!token || !verifyToken(token)) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  (req as any).user = JSON.parse(
    Buffer.from(token.split('.')[1], 'base64').toString(),
  );
  next();
}

/**
 * Middleware that allows a patient to modify or delete only their account
 *
 * @param req - request
 * @param res - response
 * @param next - next
 */

export function canModify(req: Request, res: Response, next: NextFunction) {
  const userId = (req as any).user?.userId;
  const paramId = parseInt(req.params.id, 10);

  if (userId !== paramId) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  next();
}
