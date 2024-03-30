import { Prisma } from '@prisma/client'
import prisma from '../utils/prisma'

export const createEvent = async (data: Prisma.eventsCreateInput) => {
  try {
    return await prisma.events.create({ data })
  } catch (error) {
    throw error
  }
}

export const getEvents = async () => {
  try {
    return await prisma.events.findMany()
  } catch (error) {
    throw error
  }
}

export const deleteEvent = async (id: string) => {
  try {
    return await prisma.events.delete({ where: { id } })
  } catch (error) {
    throw error
  }
}

export const checkEventsScheduledForDay = async (start_time: string, date: Date) => {
  const existingEvent = await prisma.events.findFirst({
    where: {
      event_date: {
        equals: new Date(date),
      },
      start_time: {
        equals: new Date(start_time),
      },
    },
  })
  return !!existingEvent
}

export const updateEvent = async (id: string, data: Prisma.eventsUpdateInput) => {
  try {
    return await prisma.events.update({ where: { id }, data })
  } catch (error) {
    throw error
  }
}
