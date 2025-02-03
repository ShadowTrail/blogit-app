// src/middlewares/AuthMiddleware.ts

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserService } from "../services/UserService";

dotenv.config();

export const authenticateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
      const userService = new UserService();
      const user = await userService.getUserById(decoded.id);

      if (!user) {
        res.status(401).json({ message: "User not found" });
        return;
      }

      // Attach user to request object
      req.user = user;
      next();
      return;
    } catch (error) {
      res.status(403).json({ message: "Invalid or expired token" });
      return;
    }
  } else {
    res.status(401).json({ message: "Authorization header missing" });
    return;
  }
};
