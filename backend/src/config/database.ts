// src/config/database.ts

import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "../entities/User";
import { Post } from "../entities/Post";
import { Category } from "../entities/Category";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306", 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE, 
  entities: [User, Post, Category],
  synchronize: true, // for development only;
  logging: false,
});

// Export a function to initialize the connection
export const connectDB = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
};
