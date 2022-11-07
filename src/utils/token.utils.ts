import { Request, Response, NextFunction } from 'express';

import jsonwebtoken from 'jsonwebtoken';

import { ILogin } from '../interfaces/ILogin';

const jwt = jsonwebtoken;

const jwtSecret = process.env.JWT_SECRET;

export function generateToken(data: ILogin) {
  return jwt
    .sign({ data }, jwtSecret as string, { algorithm: 'HS256', expiresIn: '1d' });
}

export function validateToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const payload = jwt.verify(authorization, jwtSecret as string);
    req.body.user = payload;

    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
