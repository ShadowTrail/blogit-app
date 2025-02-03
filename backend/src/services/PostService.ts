// src/services/PostService.ts
import { CategoryRepository } from "./../repositories/CategoryRepository";
import { PostRepository } from "../repositories/PostRepository";
import { Post } from "../entities/Post";
import { Category } from "../entities/Category";

interface CreatePostDTO {
  title: string;
  content: string;
  authorId: number;
  categoryName?: string;
  imageUrl?: string;
}

interface UpdatePostDTO {
  title?: string;
  content?: string;
  categoryName?: string;
  imageUrl?: string;
}

export class PostService {
  private postRepository: PostRepository;
  private categoryRepository: CategoryRepository;

  constructor() {
    this.postRepository = new PostRepository();
    this.categoryRepository = new CategoryRepository();
  }

  async getPopularPosts(limit: number = 5): Promise<Post[]> {
    return this.postRepository.findPopularPosts(limit);
  }

  async getPostsByCategoryAndid(
    id: number,
    categoryName: string
  ): Promise<Post | null> {
    if (isNaN(id)) {
      throw new Error("Invalid post ID");
    }
    return this.postRepository.findByCategoryAndid(id, categoryName);
  }

  async createPost(postData: CreatePostDTO): Promise<Post> {
    const { title, content, authorId, categoryName, imageUrl } = postData;

    let category: Category | null = null;

    if (categoryName) {
      category = await this.categoryRepository.findByCategoryName(categoryName);
      if (!category) {
        category = await this.categoryRepository.createCategory(categoryName);
      }
    }
    return this.postRepository.createPost({
      title,
      content,
      author: { id: authorId } as any, // TypeORM handles relations
      category: category ? ({ id: category.id } as any) : null,
      imageUrl: imageUrl,
    });
  }

  async updatePost(id: number, postData: UpdatePostDTO): Promise<Post> {
    const { title, content, categoryName, imageUrl } = postData;
    const updateData: Partial<Post> = {};

    if (title !== null) updateData.title = title;
    if (content !== null) updateData.content = content;
    if (imageUrl != null) updateData.imageUrl = imageUrl;
    if (categoryName !== null) {
      if (categoryName) {
        let category = await this.categoryRepository.findByCategoryName(
          categoryName
        );
        if (!category) {
          category = await this.categoryRepository.createCategory(categoryName);
        }
        updateData.category = { id: category.id } as any;
      } else {
        updateData.category = null;
      }
    }

    return this.postRepository.updatePost(id, updateData);
  }

  async deletePost(id: number): Promise<void> {
    return this.postRepository.deletePost(id);
  }

  async incrementViewCount(id: number): Promise<void> {
    return this.postRepository.incrementViewCount(id);
  }

  async getPostsByAuthor(authorId: number): Promise<Post[]> {
    return this.postRepository.findByAuthor(authorId);
  }

  async getPostById(id: number): Promise<Post | null> {
    return this.postRepository.findById(id);
  }

  async getPostsByCategory(categoryName: string): Promise<Post[]> {
    return this.postRepository.findByCategory(categoryName);
  }

  async getAllPosts(): Promise<Post[]> {
    return this.postRepository.findAll();
  }
}
