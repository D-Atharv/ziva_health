import { prisma } from "../config/db";

export async function createEvent(
  userId: number,
  title: string,
  description: string,
  dateTime: Date,
  location: string,
  maxCapacity: number
) {
  const existing = await prisma.event.findUnique({ where: { title } });
  if (existing) throw new Error("Event with this title already exists");

  const event = await prisma.event.create({
    data: {
      title,
      description,
      dateTime,
      location,
      maxCapacity,
      createdBy: userId,
    },
  });

  return event;
}

export async function listAllEvents() {
  const events = await prisma.event.findMany({
    orderBy: { dateTime: "asc" },
    include: { registrations: true },
  });
  return events.map((e) => ({
    ...e,
    availableSpots: e.maxCapacity - e.registrations.length,
  }));
}

export async function getEventById(eventId: number) {
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: { registrations: true, creator: true },
  });
  if (!event) throw new Error("Event not found");

  return {
    ...event,
    registrationCount: event.registrations.length,
    availableSpots: event.maxCapacity - event.registrations.length,
  };
}

export async function updateEvent(
  userId: number,
  eventId: number,
  data: Partial<{
    title: string;
    description: string;
    dateTime: Date;
    location: string;
    maxCapacity: number;
  }>
) {
  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event) throw new Error("Event not found");
  if (event.createdBy !== userId) throw new Error("Unauthorized");

  if (!data || Object.keys(data).length === 0) {
    throw new Error("No update fields provided");
  }

  return prisma.event.update({
    where: { id: eventId },
    data,
  });
}

export async function deleteEvent(userId: number, eventId: number) {
  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event) throw new Error("Event not found");
  if (event.createdBy !== userId) throw new Error("Unauthorized");

  await prisma.registration.deleteMany({ where: { eventId } });
  await prisma.event.delete({ where: { id: eventId } });

  return { message: "Event deleted successfully" };
}
