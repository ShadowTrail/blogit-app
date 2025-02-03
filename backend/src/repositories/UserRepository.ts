// src/repositories/UserRepository.ts

import { Repository } from "typeorm";
import { User } from "../entities/User";
import { AppDataSource } from "../config/database";

export class UserRepository {
  private repo: Repository<User>;

  constructor() {
    this.repo = AppDataSource.getRepository(User);
  }

  async findByGoogleId(googleId: string): Promise<User | null> {
    return this.repo.findOne({ where: { googleId } });
  }

  async findById(id: number): Promise<User | null> {
    return this.repo.findOne({ where: { id } });
  }

  async createUser(userData: Partial<User>): Promise<User> {
    const newUser = this.repo.create(userData);
    return this.repo.save(newUser);
  }
}
