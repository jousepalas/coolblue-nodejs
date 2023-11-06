import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';

const { JWT_TOKEN_SECRET } = config.env;

const getTokenData = (token: string): any => {
  if (!token) return false;
  token = token.split(' ').slice(-1)[0];

  try {
    const data = jwt.verify(token, JWT_TOKEN_SECRET!);
    return data;
  } catch (err) {
    return false;
  }
};

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  let token = req.header("authorization");

  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }

  const user = getTokenData(token);
  return user ? next() : res.status(400).json({ error: "Token is not valid" });
};

export default validateToken;
