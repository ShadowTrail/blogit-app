import request from "supertest";
import { createConnection, getConnection } from "typeorm";
import app from "../src/index";
import { User } from "../src/entities/User";
import { Post } from "../src/entities/Post";

let token: string;

beforeAll(async () => {
  await createConnection({
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT!, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "test_db",
    entities: [User, Post],
    synchronize: true,
    dropSchema: true,
  });

  // Mock user and token
  // Alternatively, perform authentication flow to obtain a valid token
  token = "mocked_jwt_token";
});

afterAll(async () => {
  await getConnection().close();
});

describe("POST /posts", () => {
  it("should create a new post", async () => {
    const res = await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Post",
        content: "This is a test post.",
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.title).toBe("Test Post");
  });
});

// Additional tests for GET, PUT, DELETE
