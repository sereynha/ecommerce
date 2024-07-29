import { Request, Response, NextFunction } from 'express';
import {redis} from "../config/radis-cahe";
import {throws} from "node:assert";
import {InternalException} from "../expections/internal-exception";
import { ErrorCode } from '../expections/root';

export const cacheMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const cacheKey = req.originalUrl;

    try {
      const cachedData = await redis.get(cacheKey);
      if (cachedData) {
        return res.status(200).json(JSON.parse(cachedData));
      } else {
        res.sendResponse = res.json;
        res.json = (body: any) => {
          redis.set(cacheKey, JSON.stringify(body), 'EX', 86400); 
          return res.sendResponse!(body);
        };
        next();
      }
    } catch (error) {
      next(new InternalException('Cache middleware error:',ErrorCode.INTERNAL_EXCEPTION, error));
    }
  };

export const clearCacheMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cacheKeys = await redis.keys('*');
    if (cacheKeys.length) {
      await redis.del(cacheKeys);
    }
    next();
  } catch (error) {
    next(new InternalException('Clear cache middleware error:', ErrorCode.INTERNAL_EXCEPTION, error));
  }
};