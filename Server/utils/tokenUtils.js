import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const generateNewRefreshToken = (public_id, email) => {
    return jwt.sign({publicId: public_id, email: email}, process.env.JWT_REFRESH_SECRET, {expiresIn: '7d'});
    
};

export const generateNewAccessToken = (public_id, email) => {
    return jwt.sign({publicId: public_id, email: email}, process.env.JWT_ACCESS_SECRET, {expiresIn: '15m'});
};
