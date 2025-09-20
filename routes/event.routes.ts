import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import {
  createEvent,
  listEvents,
  getEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/event.controller";

const router = Router();

router
  .post("/events", authenticate, createEvent)
  .get("/events", listEvents)
  .get("/events/:eventId", getEvent)
  .put("/events/:eventId", authenticate, updateEvent)
  .delete("/events/:eventId", authenticate, deleteEvent);

export default router;
