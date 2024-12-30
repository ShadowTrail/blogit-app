import { Router } from "express";
import { PostController } from "../controllers/PostController";
import { authenticateJWT } from "../middlewares/AuthMiddleware";

const router = Router();

router.get("/", PostController.getAllPosts);
router.get("/:id", PostController.getPostById);
router.post("/", authenticateJWT, PostController.createPost);
router.put("/:id", authenticateJWT, PostController.updatePost);
router.delete("/:id", authenticateJWT, PostController.deletePost);

export default router;
