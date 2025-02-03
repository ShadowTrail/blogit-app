// src/services/CategoryService.ts

import { CategoryRepository } from "../repositories/CategoryRepository";
import { Category } from "../entities/Category";

export class CategoryService {
  private categoryRepository: CategoryRepository;

  constructor() {
    this.categoryRepository = new CategoryRepository();
  }

  async getAllCategories(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }

  async createCategory(name: string): Promise<Category> {
    const existingCategory = await this.categoryRepository.findByCategoryName(name);
    if (existingCategory) {
      throw new Error("Category already exists");
    }
    return this.categoryRepository.createCategory(name);
  }

   async getCategoryById(id: number): Promise<Category | null> {
      return this.categoryRepository.findById(id);
    }

}
