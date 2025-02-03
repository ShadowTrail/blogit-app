// src/services/UserService.ts

import { UserRepository } from "../repositories/UserRepository";
import { User } from "../entities/User";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getUserByGoogleId(googleId: string): Promise<User | null> {
    return this.userRepository.findByGoogleId(googleId);
  }

  async getUserById(id: number): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async createUser(userData: Partial<User>): Promise<User> {
    return this.userRepository.createUser(userData);
  }
}
