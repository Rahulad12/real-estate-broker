import { sign } from "jsonwebtoken";
import { env } from "@/config/env";
import { Types } from "mongoose";
interface TokenPayload {
    id: Types.ObjectId;
    role: string;
}
export const generateToken = (payload: TokenPayload) => {
    return sign(payload, env.JWT_SECRET!, { expiresIn: "1d" });
};
