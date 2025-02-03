// backend/src/repositories/PostRepository.ts

import { Repository } from "typeorm";
import { Post } from "../entities/Post";
import { AppDataSource } from "../config/database";

export class PostRepository {
  private repo: Repository<Post>;

  constructor() {
    this.repo = AppDataSource.getRepository(Post);
  }

  async findPopularPosts(limit: number = 5): Promise<Post[]> {
    return this.repo.find({
      relations: ["author", "category"],
      order: { viewCount: "DESC" },
      take: limit,
    });
  }

  async findByCategoryAndid(
    id: number,
    categoryName: string
  ): Promise<Post | null> {
    return this.repo
      .createQueryBuilder("post")
      .leftJoinAndSelect("post.category", "category")
      .leftJoinAndSelect("post.author", "author")
      .where("post.id = :id", { id })
      .andWhere("category.name = :categoryName", { categoryName })
      .getOne();
  }

  async createPost(postData: Partial<Post>): Promise<Post> {
    const newPost = this.repo.create(postData);
    return this.repo.save(newPost);
  }

  async updatePost(id: number, postData: Partial<Post>): Promise<Post> {
    await this.repo.update(id, postData);
    const updatedPost = await this.repo.findOne({
      where: { id: id },
      relations: ["author", "category"],
    });
    if (!updatedPost) {
      throw new Error("Post not found after update.");
    }
    return updatedPost;
  }

  async deletePost(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async incrementViewCount(id: number): Promise<void> {
    await this.repo.increment({ id: id }, "viewCount", 1);
  }

  async findByAuthor(authorId: number): Promise<Post[]> {
    return this.repo.find({
      where: { author: { id: authorId } },
      relations: ["author", "category"],
      order: { createdAt: "DESC" },
    });
  }

  async findById(id: number): Promise<Post | null> {
    return this.repo.findOne({
      where: { id },
      relations: ["author", "category"],
    });
  }

  async findByCategory(categoryName: string): Promise<Post[]> {
    return this.repo.find({
      where: { category: { name: categoryName } },
      relations: ["author", "category"],
      order: { createdAt: "DESC" },
    });
  }

  async findAll(): Promise<Post[]> {
    return this.repo.find({
      relations: ["author", "category"],
      order: { createdAt: "DESC" },
    });
  }
}
