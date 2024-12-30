import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const router = Router();

router.get("/google", AuthController.googleAuth);
router.get("/google/callback", AuthController.googleCallback);

export default router;
