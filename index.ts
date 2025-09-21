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

const allowedOrigins = [
  "http://localhost:3000",
  "https://ziva-health-dks6.onrender.com",
  "https://eventhub.athard.in",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  })
);

app.use(express.json()).use(cookieParser());
app
  .use("/api/auth", authRoutes)
  .use("/api", registrationRoutes)
  .use("/api", eventRoutes);

app.listen(ENV.PORT, () => {
  console.log(`Server running on port ${ENV.PORT}`);
});
