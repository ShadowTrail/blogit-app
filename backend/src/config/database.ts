import { createConnection } from "typeorm";
import dotenv from "dotenv";
import { User } from "../entities/User";
import { Post } from "../entities/Post";

dotenv.config();

export const connectDB = async () => {
  await createConnection({
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT!, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [User, Post],
    synchronize: true, // Set to false in production and use migrations
  });
};
