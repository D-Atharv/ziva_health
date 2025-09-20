import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./config/db";
import { ENV } from "./config/env";
import authRoutes from "./routes/auth.routes";
import registrationRoutes from "./routes/registration.route";
import eventRoutes from "./routes/event.routes";

const app = express();
connectDB();

app.use(express.json()).use(cookieParser()).use(cors());

app
  .use("/api/auth", authRoutes)
  .use("/api", registrationRoutes)
  .use("/api", eventRoutes);

app.listen(ENV.PORT, () => {
  console.log(`Server running on port ${ENV.PORT}`);
});
