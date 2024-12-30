import { getRepository, Repository } from "typeorm";
import { User } from "../entities/User";

export class UserRepository {
  private repo: Repository<User>;

  constructor() {
    this.repo = getRepository(User);
  }

  async findByUserId(userid: string): Promise<User | undefined> {
    const user = await this.repo.findOne({ where: { userid } });
    return user;
   }

  async createUser(user: Partial<User>): Promise<User> {
    const newUser = this.repo.create(user);
    return this.repo.save(newUser);
  }

}
