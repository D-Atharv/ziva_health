import { prisma } from "../config/db";

export async function registerForEvent(userId: number, eventId: number) {
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: { registrations: true },
  });
  if (!event) throw new Error("Event not found");

  const existingReg = await prisma.registration.findUnique({
    where: { userId_eventId: { userId, eventId } },
  });
  if (existingReg) throw new Error("You are already registered for this event");

  if (event.registrations.length >= event.maxCapacity)
    throw new Error("Event is full");

  const registration = await prisma.registration.create({
    data: {
      userId,
      eventId,
      status: "registered",
    },
  });

  return registration;
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
    if (registrations.length === 0) {
        throw new Error("No registrations found for this user");
    }
    return registrations;
}
