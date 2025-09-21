import type { Request, Response } from "express";
import type { AuthRequest } from "../middlewares/auth.middleware.js";
import * as eventService from "../services/event.service.js";
import {
  createEventValidator,
  updateEventValidator,
  eventIdParamValidator,
} from "../validations/validator.js";
import { validateBody, validateParams } from "../validations/validation.js";

export async function createEvent(req: AuthRequest, res: Response) {
  try {
    const userId = req.userId!;
    const validatedBody = validateBody(createEventValidator, req.body);

    const event = await eventService.createEvent(
      userId,
      validatedBody.title,
      validatedBody.description,
      new Date(validatedBody.dateTime),
      validatedBody.location,
      validatedBody.maxCapacity
    );

    res.status(201).json(event);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function listEvents(req: Request, res: Response) {
  try {
    const events = await eventService.listAllEvents();
    res.json(events);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function getEvent(req: Request, res: Response) {
  try {
    const { eventId } = validateParams(eventIdParamValidator, req.params);

    const event = await eventService.getEventById(eventId);
    if (event && event.creator) {
      const { creator, ...eventWithoutCreator } = event;
      res.json(eventWithoutCreator);
      return;
    }

    res.json(event);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function updateEvent(req: AuthRequest, res: Response) {
  try {
    const userId = req.userId!;
    const { eventId } = validateParams(eventIdParamValidator, req.params);

    const validatedBody = validateBody(updateEventValidator, req.body);
    const data = {
      ...validatedBody,
      ...(validatedBody.dateTime
        ? { dateTime: new Date(validatedBody.dateTime) }
        : {}),
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
    const { eventId } = validateParams(eventIdParamValidator, req.params);

    const result = await eventService.deleteEvent(userId, eventId);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}
