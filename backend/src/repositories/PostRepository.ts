import { getRepository, Repository } from "typeorm";
import { Post } from "../entities/Post";

export class PostRepository {
  private repo: Repository<Post>;

  constructor() {
    this.repo = getRepository(Post);
  }

  async findAll(): Promise<Post[]> {
    return this.repo.find({ relations: ["author"] });
  }

  async findById(id: number): Promise<Post | undefined> {
    return this.repo.findOne(id, { relations: ["author"] });
  }

  async createPost(post: Partial<Post>): Promise<Post> {
    const newPost = this.repo.create(post);
    return this.repo.save(newPost);
  }

  async updatePost(id: number, post: Partial<Post>): Promise<Post | undefined> {
    await this.repo.update(id, post);
    return this.findById(id);
  }

  async deletePost(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  // Additional post-related data access methods
}
