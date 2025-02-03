import { Request, Response, NextFunction } from "express";


export class UserController {
  static async getProfile(
    req: Request,
    res: Response,

  ): Promise<void> {
    try {
      const user = req.user; // Set by authenticateJWT middleware
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      res.status(500).json({ message: "Error fetching user profile" });
    }
  }
}
