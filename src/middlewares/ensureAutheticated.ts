import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

import AppError from '../errors/App.Error';

interface TokenPaylod {
    iat: number;
    exp: number;
    sub: number;
}

export default function ensureAutheticated(
    request: Request, 
    response: Response, 
    next: NextFunction,
    ): void {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError('JWT token is missing', 401);
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, authConfig.jwt.secret);

        const { sub } = decoded as TokenPaylod;

        request.user = {
            id: sub,
        };

        return next();
    } catch (err) {
        throw new Error('JWT token is missing');
    }
}