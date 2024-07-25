import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyUser = (req, res, next) => {
    const token = req.cookies.my_token;
    if (!token) {
        return next(errorHandler(401, 'No token found- anauthorized access--token not found'));
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(errorHandler(401, 'Invalid token- forbidden access'));
        }
        req.user = user;
        next();
    });
}