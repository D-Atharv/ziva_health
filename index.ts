import express from "express";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db";
import { ENV } from "./config/env";
import authRoutes from "./routes/auth.routes";

const app = express();
connectDB();

app.use(express.json()).use(cookieParser());

app.use("/api/auth", authRoutes);

app.listen(ENV.PORT, () => {
  console.log(`Server running on port ${ENV.PORT}`);
});
