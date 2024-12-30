import { Request, Response } from "express";
import { PostService } from "../services/PostService";

const postService = new PostService();

export class PostController {
  static async getAllPosts(req: Request, res: Response) {
    const posts = await postService.getAllPosts();
    res.json(posts);
  }

  static async getPostById(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    const post = await postService.getPostById(id);
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  }

  static async createPost(req: Request, res: Response) {
    const post = await postService.createPost({
      title: req.body.title,
      content: req.body.content,
      author: { id: req.user.id },
    });
    res.status(201).json(post);
  }

  static async updatePost(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    const post = await postService.updatePost(id, {
      title: req.body.title,
      content: req.body.content,
    });
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: "Post not found or unauthorized" });
    }
  }

  static async deletePost(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    await postService.deletePost(id);
    res.status(204).send();
  }
}
