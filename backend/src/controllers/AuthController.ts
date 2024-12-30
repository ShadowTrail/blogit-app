import { Request, Response } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserService } from "../services/UserService";

dotenv.config();

const userService = new UserService();

export class AuthController {
  static googleAuth(req: Request, res: Response, next: Function) {
    passport.authenticate("google", { scope: ["profile", "email"] })(
      req,
      res,
      next
    );
  }

  static async googleCallback(req: Request, res: Response) {
    passport.authenticate("google", async (err: any, user: any) => {
      if (err || !user) {
        return res.status(400).json({ message: "Authentication failed" });
      }
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
        expiresIn: "1h",
      });
      res.json({ token });
    })(req, res);
  }
}
