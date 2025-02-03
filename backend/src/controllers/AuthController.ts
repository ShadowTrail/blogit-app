// backend/src/controllers/AuthController.ts

import { Request, Response, NextFunction } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserService } from "../services/UserService";

dotenv.config();

export class AuthController {
  static async googleCallback(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    passport.authenticate(
      "google",
      { session: false },
      async (err, user, info) => {
        if (err || !user) {
          res.redirect(
            `${process.env.FRONTEND_URL}/login?error=Authentication failed`
          );
          return;
        }

        try {
          const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
            expiresIn: "1h",
          });
          // Redirect to frontend with token as query parameter
          res.redirect(
            `${process.env.FRONTEND_URL}/auth/callback?token=${token}`
          );
        } catch (error) {
          console.error("Error generating JWT:", error);
          res.redirect(
            `${process.env.FRONTEND_URL}/login?error=Token generation failed`
          );
        }
      }
    )(req, res, next);
  }
}
