import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  DATABASE_URL: process.env.DATABASE_URL!,
  JWT_SECRET: process.env.JWT_SECRET || "dev_secret",
  PORT: process.env.PORT || 5000,
};
