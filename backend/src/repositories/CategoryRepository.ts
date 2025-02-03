// src/repositories/CategoryRepository.ts

import { Repository } from "typeorm";
import { Category } from "../entities/Category";
import { AppDataSource } from "../config/database";

export class CategoryRepository {
  private repo: Repository<Category>;

  constructor() {
    this.repo = AppDataSource.getRepository(Category);
  }

  async findAll(): Promise<Category[]> {
    return this.repo.find({ order: { name: "ASC" } });
  }

  async findByCategoryName(name: string): Promise<Category | null> {
    return this.repo.findOne({ where: { name } });
  }

  async createCategory(name: string): Promise<Category> {
    const newCategory = this.repo.create({ name });
    return this.repo.save(newCategory);
  }

   async findById(id: number): Promise<Category | null> {
      return this.repo.findOne({
        where: { id: id},
      });
    }
}
