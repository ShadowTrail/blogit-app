// src/types/express.d.ts

import { User } from "../entities/User";

declare global {
  namespace Express {
    interface User {
      id: number;
      googleId: string;
      email: string;
      name: string;
    }

    interface Request {
      user?: User;
    }
  }
}
