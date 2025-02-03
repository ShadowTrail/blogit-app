// backend/src/routes/postRoutes.ts

import { Router } from "express";
import { PostController } from "../controllers/PostController";
import { authenticateJWT } from "../middlewares/AuthMiddleware";
import { upload } from "../middlewares/UploadMiddleware";

const router = Router();

/**
 * @route GET /posts/popular
 * @desc Get top 5 popular posts
 * @access Public
 */
router.get("/popular", PostController.getPopularPosts);

/**
 * @route GET /posts/:category/:id
 * @desc Get a single post by category and id
 * @access Public
 */
router.get("/:category/:id", PostController.getPostByCategoryAndid);

/**
 * @route POST /posts/create_post
 * @desc Create a new post
 * @access Protected
 */
router.post(
  "/create_post",
  authenticateJWT,
  upload.single("image"),
  PostController.createPost
);

/**
 * @route PUT /posts/:id
 */
router.put("/:id", authenticateJWT, upload.single("image"), PostController.updatePost);

/**
 * @route DELETE /posts/:id
 */
router.delete("/:id", authenticateJWT, PostController.deletePost);

/**
 * @route GET /posts/:category
 * @desc Get all posts under a specific category by name
 * @access Public
 */
router.get("/:category", PostController.getPostsByCategory);

/**
 * @route GET /posts
 * @desc Get all posts sorted by date descending
 * @access Public
 */
router.get("/", PostController.getAllPosts);




export default router;