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
exports.UserService = void 0;
const UserRepository_1 = require("../repositories/UserRepository");
class UserService {
    constructor() {
        this.userRepository = new UserRepository_1.UserRepository();
    }
    findOrCreateUser(profile) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.userRepository.findByGoogleId(profile.id);
            if (!user) {
                user = yield this.userRepository.createUser({
                    userid: profile.id,
                    email: profile.emails[0].value,
                    name: profile.displayName,
                });
            }
            return user;
        });
    }
}
exports.UserService = UserService;
