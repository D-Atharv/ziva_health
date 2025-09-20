import type { Request, Response } from "express";
import type { AuthRequest } from "../middlewares/auth.middleware";
import * as eventService from "../services/event.service";

export async function createEvent(req: AuthRequest, res: Response) {
  try {
    const userId = req.userId!;
    const { title, description, dateTime, location, maxCapacity } = req.body;

    if (!title || !description || !dateTime || !location || !maxCapacity) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const event = await eventService.createEvent(
      userId,
      title,
      description,
      new Date(dateTime),
      location,
      maxCapacity
    );
    res.status(201).json(event);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function listEvents(req: Request, res: Response) {
  try {
    const events = await eventService.listUpcomingEvents();
    res.json(events);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function getEvent(req: Request, res: Response) {
  try {
    const idParam = req.params.eventId;
    if (!idParam) {
      return res.status(400).json({ error: "Event ID is required" });
    }

    const eventId = parseInt(idParam as string, 10);
    const event = await eventService.getEventById(eventId);
    if (event && event.creator) {
      // Remove creator field before sending response
      const { creator, ...eventWithoutCreator } = event;
      res.json(eventWithoutCreator);
      return;
    }
    res.json(event);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
}

export async function updateEvent(req: AuthRequest, res: Response) {
  try {
    const userId = req.userId!;
    const idParam = req.params.eventId;
    if (!idParam) {
      return res.status(400).json({ error: "Event ID is required" });
    }

    const eventId = parseInt(idParam as string, 10);

    const { dateTime, ...rest } = req.body;

    const data = {
      ...rest,
      ...(dateTime ? { dateTime: new Date(dateTime) } : {}),
    };

    const updated = await eventService.updateEvent(userId, eventId, data);
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function deleteEvent(req: AuthRequest, res: Response) {
  try {
    const userId = req.userId!;
    const idParam = req.params.eventId;
    if (!idParam) {
      return res.status(400).json({ error: "Event ID is required" });
    }

    const eventId = parseInt(idParam as string, 10);

    const result = await eventService.deleteEvent(userId, eventId);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}
