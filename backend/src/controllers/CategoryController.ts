// src/controllers/CategoryController.ts

import { Request, Response } from "express";
import { CategoryService } from "../services/CategoryService";
import { User } from "../entities/User";

const categoryService = new CategoryService();

export class CategoryController {
  // GET /categories - Public: Get all categories
  static async getAllCategories(req: Request, res: Response): Promise<void> {
    try {
      const categories = await categoryService.getAllCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Error fetching categories" });
    }
  }

  // POST /categories - Protected: Create a new category
  static async createCategory(req: Request, res: Response): Promise<void> {
    // Assert that req.user exists. You can also add a runtime check if needed.
    const user = req.user as User;
    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { name } = req.body;
    if (!name) {
      res.status(400).json({ message: "Category name is required" });
      return;
    }

    try {
      const category = await categoryService.createCategory(name);
      res.status(201).json(category);
    } catch (error: any) {
      console.error("Error creating category:", error);
      res
        .status(400)
        .json({ message: error.message || "Error creating category" });
    }
  }
  
    // GET /categories/:id - Get a single category by ID.
    static async getCategoryById(req: Request, res: Response): Promise<void> {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid Category ID" });
        return;
      }
  
      try {
        const category = await categoryService.getCategoryById(id);
        if (category) {
          res.json(category);
        } else {
          res.status(404).json({ message: "category not found" });
        }
      } catch (error) {
        console.error(`Error fetching category with ID ${id}:`, error);
        res.status(500).json({ message: "Error fetching category" });
      }
    }
}
