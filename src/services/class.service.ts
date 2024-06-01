import { classes } from '@prisma/client'
import prisma from '../utils/prisma'

export const getClasses = async () => {
  return await prisma.classes.findMany({
    where: {
      id: {
        not: '5548805a-69e4-481c-8463-bb49bea1c330',
      },
    },
  })
}

export const addClass = async (data: classes) => {
  return await prisma.classes.create({ data })
}

export const findClassById = async (id: string) => {
  return await prisma.classes.findUniqueOrThrow({ where: { id } })
}

export const findClassByName = async (name: string) => {
  return await prisma.classes.findUnique({ where: { name } })
}

export const updateClass = async (id: string, data: Partial<classes>) => {
  return await prisma.classes.update({ where: { id }, data })
}

export const deleteClass = async (id: string) => {
  return await prisma.classes.delete({ where: { id } })
}
