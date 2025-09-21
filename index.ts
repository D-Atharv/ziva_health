import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { ENV } from "./config/env.js";
import authRoutes from "./routes/auth.routes.js";
import eventRoutes from "./routes/event.routes.js";
import registrationRoutes from "./routes/registration.route.js";

const app = express();
connectDB();

app.use(express.json()).use(cookieParser());

const corsOptions = {
  origin: [
    "https://ziva-alpha.vercel.app",
    "http://localhost:3000",
    "https://eventhub.atharvd.in",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app
  .use("/api/auth", authRoutes)
  .use("/api", registrationRoutes)
  .use("/api", eventRoutes);

app.listen(ENV.PORT, () => {
  console.log(`Server running on port ${ENV.PORT}`);
});
