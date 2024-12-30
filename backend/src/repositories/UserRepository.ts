import { getRepository, Repository } from "typeorm";
import { User } from "../entities/User";

export class UserRepository {
  private repo: Repository<User>;

  constructor() {
    this.repo = getRepository(User);
  }

  async findByGoogleId(googleId: string): Promise<User | undefined> {
    return this.repo.findOne({ googleId });
  }

  async createUser(user: Partial<User>): Promise<User> {
    const newUser = this.repo.create(user);
    return this.repo.save(newUser);
  }

}
