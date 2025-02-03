import { Category } from "./Category";
import { User } from "./User";

export interface Post {
  id: number;
  title: string;
  summary: string;
  content: string;
  author: User;
  imageUrl: string;
  category: Category;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}
