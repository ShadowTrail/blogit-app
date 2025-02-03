// backend/src/routes/authRoutes.ts

import { Router } from "express";
import passport from "passport";
import { AuthController } from "../controllers/AuthController";

const router = Router();

/**
 * @route GET /auth/google
 * @desc Initiate Google OAuth
 * @access Public
 */
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

/**
 * @route GET /auth/google/callback
 * @desc Handle Google OAuth callback
 * @access Public
 */
router.get("/google/callback", AuthController.googleCallback);

export default router;
