import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function connectDB() {
  try {
    await prisma.$connect();
    console.log("Connected to CockroachDB");
  } catch (err) {
    console.error("DB connection error:", err);
    process.exit(1);
  }
}
