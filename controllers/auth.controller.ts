import type { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";
import { setTokenCookie, clearTokenCookie } from "../utils/cookie";
import { validateBody } from "../validations/validation";
import { registerValidator, loginValidator } from "../validations/validator";

export async function register(req: Request, res: Response) {
  try {
    const value = validateBody(registerValidator, req.body);

    const token = await registerUser(value.name, value.email, value.password);

    setTokenCookie(res, token);

    res.status(201).json({ message: "User registered successfully" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const value = validateBody(loginValidator, req.body);

    const token = await loginUser(value.email, value.password);

    setTokenCookie(res, token);

    res.status(200).json({ message: "Login successful" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function logout(req: Request, res: Response) {
  clearTokenCookie(res);
  res.status(200).json({ message: "Logged out successfully" });
}
