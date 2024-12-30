import { PostRepository } from "../repositories/PostRepository";
import { Post } from "../entities/Post";

export class PostService {
  private postRepository: PostRepository;

  constructor() {
    this.postRepository = new PostRepository();
  }

  async getAllPosts(): Promise<Post[]> {
    return this.postRepository.findAll();
  }

  async getPostById(id: number): Promise<Post | undefined> {
    return this.postRepository.findById(id);
  }

  async createPost(postData: Partial<Post>): Promise<Post> {
    return this.postRepository.createPost(postData);
  }

  async updatePost(
    id: number,
    postData: Partial<Post>
  ): Promise<Post | undefined> {
    return this.postRepository.updatePost(id, postData);
  }

  async deletePost(id: number): Promise<void> {
    return this.postRepository.deletePost(id);
  }

  // Additional post-related business logic
}
