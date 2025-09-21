import { Router } from "express";
import { register, login, logout, me } from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router
  .post("/register", register)
  .post("/login", login)
  .post("/logout", logout)
  .get("/me", authenticate, me);

export default router;
