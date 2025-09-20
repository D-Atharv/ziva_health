import type { Request, Response } from "express";
import * as registrationService from "../services/registration.service";
import type { AuthRequest } from "../middlewares/auth.middleware";

export async function register(req: AuthRequest, res: Response) {
  try {
    const userId = req.userId!;
    const idParam = req.params.eventId;
    if (!idParam) {
      return res.status(400).json({ error: "Event ID is required" });
    }

    const eventId = parseInt(idParam as string, 10);
    const registration = await registrationService.registerForEvent(
      userId,
      eventId
    );
    res.status(201).json(registration);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function cancel(req: AuthRequest, res: Response) {
  try {
    const userId = req.userId!;
    const idParam = req.params.eventId;
    if (!idParam) {
      return res.status(400).json({ error: "Event ID is required" });
    }

    const eventId = parseInt(idParam as string, 10);
    const result = await registrationService.cancelRegistration(
      userId,
      eventId
    );
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function getUserRegs(req: Request, res: Response) {
  try {
    const idParam = req.params.userId;
    if (!idParam) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const userId = parseInt(idParam as string, 10);
    const regs = await registrationService.getUserRegistrations(userId);
    res.json(regs);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}
