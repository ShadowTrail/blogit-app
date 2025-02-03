// src/routes/categoryRoutes.ts

import { Router } from "express";
import { CategoryController } from "../controllers/CategoryController";
import { authenticateJWT } from "../middlewares/AuthMiddleware";

const router = Router();

/**
 * @route GET /categories
 * @desc Get all categories
 * @access Public
 */
router.get("/", CategoryController.getAllCategories);

/**
 * @route POST /categories
 * @desc Create a new category
 * @access Protected
 */
router.post("/", authenticateJWT, CategoryController.createCategory);

export default router;
