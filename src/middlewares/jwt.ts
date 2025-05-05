import {Request, Response, NextFunction} from 'express';
import * as jwt from  'jsonwebtoken';
import config from '../config/config';

export const checkJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided or bad format' });
    }
  
    const token = authHeader.split(' ')[1];
  
    try {
      const jwtPayload = jwt.verify(token, config.jwtSecret) as any;
      res.locals.jwtPayload = jwtPayload;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  };