import { prisma } from "../config/db.js";

export async function registerForEvent(userId: number, eventId: number) {
  return await prisma.$transaction(async (tx) => {
    const event = await tx.event.findUnique({ where: { id: eventId } });
    if (!event) throw new Error("Event not found");

    const existing = await tx.registration.findUnique({
      where: { userId_eventId: { userId, eventId } },
    });
    if (existing) throw new Error("You are already registered for this event");

    const registrationCount = await tx.registration.count({
      where: { eventId },
    });

    if (registrationCount >= event.maxCapacity)
      throw new Error("Event is full");

    const registration = await tx.registration.create({
      data: { userId, eventId, status: "registered" },
    });

    return registration;
  });
}

export async function cancelRegistration(userId: number, eventId: number) {
  const reg = await prisma.registration.findUnique({
    where: { userId_eventId: { userId, eventId } },
  });
  if (!reg) throw new Error("Registration not found");

  await prisma.registration.delete({
    where: { id: reg.id },
  });

  return { message: "Registration cancelled successfully" };
}

export async function getUserRegistrations(userId: number) {
  const registrations = await prisma.registration.findMany({
    where: { userId },
    include: {
      event: true,
    },
  });

  return registrations;
}
