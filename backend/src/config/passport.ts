import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import { UserService } from "../services/UserService";

dotenv.config();

const userService = new UserService();

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  // Implement user retrieval by ID if needed
  done(null, id);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await userService.findOrCreateUser(profile);
        done(null, user);
      } catch (err) {
        done(err, undefined);
      }
    }
  )
);
