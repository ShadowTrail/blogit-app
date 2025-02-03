
// backend/src/controllers/PostController.ts
import { Request, Response } from "express";
import { PostService } from "../services/PostService";
import { User } from "../entities/User";

const postService = new PostService();

export class PostController {
  // GET /posts/popular - Get top 5 popular posts
  static async getPopularPosts(req: Request, res: Response): Promise<void> {
    try {
      const popularPosts = await postService.getPopularPosts(5);
      res.json(popularPosts);
    } catch (error) {
      console.error("Error fetching popular posts:", error);
      res.status(500).json({ message: "Error fetching popular posts" });
    }
  }

  /**
   * @route GET /posts/:category/:id
   * @desc Get a single post by category and id
   * @access Public
   */
  static async getPostByCategoryAndid(
    req: Request,
    res: Response
  ): Promise<void> {
    const category = req.params.category;
    const id = Number(req.params.id);

    try {
      const post = await postService.getPostsByCategoryAndid(id, category);

      if (!post) {
        res.status(404).json({ message: "Post not found." });
        return;
      }

      res.status(200).json(post);
    } catch (error) {
      console.error("Error fetching post by category and id:", error);
      res.status(500).json({ message: "Internal Server Error." });
    }
  }

  // POST /posts/create_post - Create a new post (Protected)
  static async createPost(req: Request, res: Response): Promise<void> {
    // Assert that req.user exists. The authenticateJWT middleware should ensure this.
    const user = req.user as User;
    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { title, content, categoryName } = req.body;
    if (!title || !content) {
      res.status(400).json({ message: "Title and content are required" });
      return;
    }

    let imageUrl: string | undefined = undefined;
    if (req.file) {
      imageUrl = `${process.env.API_BASE_URL}/uploads/${req.file.filename}`;
    }

    try {
      const post = await postService.createPost({
        title,
        content,
        authorId: user.id,
        categoryName, // optional, if provided
        imageUrl,
      });
      res.status(201).json(post);
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({ message: "Error creating post" });
    }
  }

  static async updatePost(req: Request, res: Response): Promise<void> {
    const user = req.user as User;
    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid post ID" });
      return;
    }

    const { title, content, categoryName } = req.body;
    let imageUrl = req.body.imageUrl; // May be empty if not updated

    if (req.file) {
      imageUrl = `${process.env.API_BASE_URL}/uploads/${req.file.filename}`;
    }

    try {
      const post = await postService.getPostById(id);
      if (!post) {
        res.status(404).json({ message: "Post not found" });
        return;
      }

      // Check if the authenticated user is the author
      if (post.author.id !== user.id) {
        res.status(403).json({ message: "Unauthorized: Not the post author" });
        return;
      }

      // Create an update payload containing only the fields that are provided
      const updateData: any = {};
      if (title) updateData.title = title;
      if (content) updateData.content = content;
      if (categoryName) updateData.categoryName = categoryName;
      if (imageUrl) updateData.imageUrl = imageUrl;

      const updatedPost = await postService.updatePost(id, updateData);
      res.json(updatedPost);
    } catch (error) {
      console.error(`Error updating post with ID ${id}:`, error);
      res.status(500).json({ message: "Error updating post" });
    }
  }


  // DELETE /posts/:id - Delete a post by ID (Protected)
  static async deletePost(req: Request, res: Response): Promise<void> {
    // Ensure the user is authenticated.
    const user = req.user as User;
    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    // Parse and validate the post ID.
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid post ID" });
      return;
    }

    try {
      // Fetch the post to verify it exists and belongs to the user.
      const post = await postService.getPostById(id);
      if (!post) {
        res.status(404).json({ message: "Post not found" });
        return;
      }

      // Check if the authenticated user is the post's author.
      if (post.author.id !== user.id) {
        res.status(403).json({ message: "Unauthorized: Not the post author" });
        return;
      }

      // Delete the post.
      await postService.deletePost(id);
      res.status(204).send();
    } catch (error) {
      console.error(`Error deleting post with ID ${id}:`, error);
      res.status(500).json({ message: "Error deleting post" });
    }
  }

  /**
   * @route GET /user/posts
   * @desc Get all posts created by the authenticated user
   * @access Protected
   */
  static async getPostsByAuthor(req: Request, res: Response): Promise<void> {
    const user = req.user as User;
    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    try {
      const posts = await postService.getPostsByAuthor(user.id);
      res.status(200).json(posts);
    } catch (error) {
      console.error("Error fetching posts by author:", error);
      res.status(500).json({ message: "Error fetching posts by author" });
    }
  }

  // GET /posts/:category - Get all posts under a specific category
  static async getPostsByCategory(req: Request, res: Response): Promise<void> {
    const categoryName = req.params.category;
    if (!categoryName) {
      res.status(400).json({ message: "Category name is required" });
      return;
    }

    try {
      const posts = await postService.getPostsByCategory(categoryName);
      res.json(posts);
    } catch (error) {
      console.error(
        `Error fetching posts for category: ${categoryName}:`,
        error
      );
      res.status(500).json({ message: "Error fetching posts by category" });
    }
  }

  // GET /posts - Get all posts sorted by date descending
  static async getAllPosts(req: Request, res: Response): Promise<void> {
    try {
      const posts = await postService.getAllPosts();
      res.json(posts);
    } catch (error) {
      console.error("Error fetching all posts:", error);
      res.status(500).json({ message: "Error fetching posts" });
    }
  }
}