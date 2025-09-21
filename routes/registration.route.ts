import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import {
  register,
  cancel,
  getUserRegs,
} from "../controllers/registration.controller";

const router = Router();

router
  .post("/events/:eventId/register", authenticate, register)
  .delete("/events/:eventId/register", authenticate, cancel)
  .get("/users/:userId/registrations", authenticate, getUserRegs);

export default router;
  