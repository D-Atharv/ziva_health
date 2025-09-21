import type { Response } from "express";

const COOKIE_OPTIONS = {
  httpOnly: true,
  // secure: process.env.NODE_ENV === "production",
  secure: true,
  sameSite:
    process.env.NODE_ENV === "production"
      ? ("none" as const)
      : ("lax" as const),
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export function setTokenCookie(res: Response, token: string) {
  res.cookie("token", token, COOKIE_OPTIONS);
}

export function clearTokenCookie(res: Response) {
  res.clearCookie("token", COOKIE_OPTIONS);
}
