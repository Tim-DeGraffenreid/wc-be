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