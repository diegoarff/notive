import { Response, NextFunction } from 'express';
import { IRequest } from '../utils/interfaces';

export const getter = (
  req: IRequest,
  res: Response,
  next: NextFunction,
): void => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    const payload = token.split('.')[1];
    const decodedPayload = JSON.parse(
      Buffer.from(payload, 'base64').toString(),
    );
    req.creatorId = decodedPayload.id;
    next();
  }
};
