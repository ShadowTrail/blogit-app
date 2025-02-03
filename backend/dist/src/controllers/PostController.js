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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const PostService_1 = require("../services/PostService");
const postService = new PostService_1.PostService();
class PostController {
    static getAllPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield postService.getAllPosts();
            res.json(posts);
        });
    }
    static getPostById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id, 10);
            const post = yield postService.getPostById(id);
            if (post) {
                res.json(post);
            }
            else {
                res.status(404).json({ message: "Post not found" });
            }
        });
    }
    static createPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield postService.createPost({
                title: req.body.title,
                content: req.body.content,
                author: { id: req.user.id },
            });
            res.status(201).json(post);
        });
    }
    static updatePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id, 10);
            const post = yield postService.updatePost(id, {
                title: req.body.title,
                content: req.body.content,
            });
            if (post) {
                res.json(post);
            }
            else {
                res.status(404).json({ message: "Post not found or unauthorized" });
            }
        });
    }
    static deletePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id, 10);
            yield postService.deletePost(id);
            res.status(204).send();
        });
    }
}
exports.PostController = PostController;
