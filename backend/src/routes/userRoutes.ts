import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authenticateJWT } from "../middlewares/AuthMiddleware";
import { PostController } from "../controllers/PostController";

const router = Router();

/**
 * @route GET /user/profile
 * @desc Get authenticated user's profile
 * @access Protected
 */
router.get("/profile", authenticateJWT, UserController.getProfile);

/**
 * @route GET /user/posts
 * @desc Get all posts created by the authenticated user
 * @access Protected
 */
router.get("/posts", authenticateJWT, PostController.getPostsByAuthor);

export default router;
