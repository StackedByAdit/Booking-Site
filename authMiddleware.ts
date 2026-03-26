import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const secretKey = "thismustbethesecretkey123";

interface JwtPayload {
  userId: number;
  username: string;
}

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      success: false,
      error: "Authorization header missing",
    });
  }

  try {
    const payload = jwt.verify(token, secretKey) as JwtPayload;

    req.user = {
      userId: payload.userId,
      username: payload.username,
    };

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: "Token invalid",
    });
  }
};