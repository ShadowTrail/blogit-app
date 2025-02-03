// src/config/passport.ts

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { UserService } from "../services/UserService";
import dotenv from "dotenv";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const userService = new UserService();
        const existingUser = await userService.getUserByGoogleId(profile.id);

        if (existingUser) {
          return done(null, existingUser);
        }

        // Extract email from profile
        const email = profile.emails && profile.emails[0].value;
        if (!email) {
          return done(new Error("No email found in Google profile"), undefined);
        }

        // Create new user
        const newUser = await userService.createUser({
          googleId: profile.id,
          email,
          name: profile.displayName,
        });

        return done(null, newUser);
      } catch (error) {
        return done(error, undefined);
      }
    }
  )
);

// Serialize and deserialize user (if using sessions)
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const userService = new UserService();
    const user = await userService.getUserById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
