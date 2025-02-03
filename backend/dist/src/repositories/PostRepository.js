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
exports.PostRepository = void 0;
const typeorm_1 = require("typeorm");
const Post_1 = require("../entities/Post");
class PostRepository {
    constructor() {
        this.repo = (0, typeorm_1.getRepository)(Post_1.Post);
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repo.find({ relations: ["userid"] });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repo.find({ relations: ["userid"] });
        });
    }
    createPost(post) {
        return __awaiter(this, void 0, void 0, function* () {
            const newPost = this.repo.create(post);
            return this.repo.save(newPost);
        });
    }
    updatePost(id, post) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repo.update(id, post);
            return this.findById(id);
        });
    }
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repo.delete(id);
        });
    }
}
exports.PostRepository = PostRepository;
