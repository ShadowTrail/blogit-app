// src/index.ts
import path from 'path';
import "reflect-metadata";
import express from "express";
import passport from "passport";
import session from "express-session";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import postRoutes from "./routes/postRoutes";
import userRoutes from "./routes/userRoutes";
import { connectDB } from "./config/database";
import "./config/passport";
import helmet from "helmet";
import cors from "cors";
import { setupSwagger } from "./config/swagger";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Security Middlewares
app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Body Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session Middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_session_secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === "production" },
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRoutes);
app.use("/categories", categoryRoutes);
app.use("/posts", postRoutes);
app.use("/user", userRoutes);

// Swagger Documentation
setupSwagger(app);

// Error Handling Middleware
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
  }
);

// Start Server
const startServer = async () => {
  try {
    await connectDB(); // Ensure this resolves successfully BEFORE using repositories
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
};

startServer();

export { app };
