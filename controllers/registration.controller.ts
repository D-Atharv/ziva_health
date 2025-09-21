import type { Request, Response } from "express";
import type { AuthRequest } from "../middlewares/auth.middleware.js";
import * as registrationService from "../services/registration.service.js";
import { validateParams } from "../validations/validation.js";
import {
  eventIdParamValidator,
  userIdParamValidator,
} from "../validations/validator.js";

export async function register(req: AuthRequest, res: Response) {
  try {
    const userId = req.userId!;
    const { eventId } = validateParams(eventIdParamValidator, req.params);

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
    const { eventId } = validateParams(eventIdParamValidator, req.params);

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
    const { userId } = validateParams(userIdParamValidator, req.params);

    const regs = await registrationService.getUserRegistrations(userId);
    res.json(regs);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}
