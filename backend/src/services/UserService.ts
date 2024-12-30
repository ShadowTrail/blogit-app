import { UserRepository } from "../repositories/UserRepository";
import { User } from "../entities/User";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async findOrCreateUser(profile: any): Promise<User> {
    let user = await this.userRepository.findByGoogleId(profile.id);
    if (!user) {
      user = await this.userRepository.createUser({
        googleId: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName,
      });
    }
    return user;
  }

  // Additional user-related business logic
}
