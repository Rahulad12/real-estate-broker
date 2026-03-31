import { sign } from "jsonwebtoken";
import { env } from "@/config/env";
import { Types } from "mongoose";
interface TokenPayload {
    id: Types.ObjectId;
    role: string;
}

export const generateAccessToken = (payload: TokenPayload) => {
    return sign(payload, env.JWT_SECRET!, { expiresIn: env.JWT_EXPIRES_IN });
};

export const generateRefreshToken = (payload: TokenPayload) => {
    return sign(payload, env.JWT_REFRESH_SECRET!, { expiresIn: env.REFRESH_TOKEN_EXPIRES_IN });
};

// Keep for backward compatibility
export const generateToken = generateAccessToken;
