"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const typeorm_1 = require("typeorm");
const index_1 = __importDefault(require("../src/index"));
const User_1 = require("../src/entities/User");
const Post_1 = require("../src/entities/Post");
let token;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, typeorm_1.createConnection)({
        type: "mysql",
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: "test_db",
        entities: [User_1.User, Post_1.Post],
        synchronize: true,
        dropSchema: true,
    });
    // Mock user and token
    // Alternatively, perform authentication flow to obtain a valid token
    token = "mocked_jwt_token";
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, typeorm_1.getConnection)().close();
}));
describe("POST /posts", () => {
    it("should create a new post", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .post("/posts")
            .set("Authorization", `Bearer ${token}`)
            .send({
            title: "Test Post",
            content: "This is a test post.",
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty("id");
        expect(res.body.title).toBe("Test Post");
    }));
});
// Additional tests for GET, PUT, DELETE
