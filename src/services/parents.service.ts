import { hashPassword } from '../utils/password.manager'
import prisma from '../utils/prisma'
import { Prisma, demographic_info, parent, student } from '@prisma/client'

export const getParents = async () => {
  return await prisma.parent.findMany()
}

export const createParent = async (data: Prisma.parentCreateInput) => {
  data.password = await hashPassword(data.password)
  data.birthday = new Date(data.birthday)
  const parent = await prisma.parent.create({
    data,
  })

  return parent
}

export const findParentByEmail = async ({ email }: { email: string }) => {
  return await prisma.parent.findFirst({ where: { email } })
}

export const findParentById = async (userId: string) => {
  return await prisma.parent.findUnique({ where: { id: userId } })
}

export const createNewStudent = async (studentData: student, parentId: string) => {
  studentData.birthday = new Date(studentData.birthday)
  studentData.password = await hashPassword(studentData.password)
  const student = await prisma.student.create({
    data: {
      ...studentData,
    },
  })

  await prisma.parent.update({
    where: { id: parentId },
    data: {
      student: {
        connect: {
          id: student.id,
        },
      },
    },
  })

  return student
}

export const getStudents = async (id: string) => {
  return await prisma.student.findMany({
    where: { parent: { id } },
    include: { knowledge: true },
  })
}

export const addDemographic = async (id: string, data: demographic_info) => {
  const demographic = await prisma.demographic_info.create({
    data: {
      ...data,
    },
  })

  const parent = await prisma.parent.update({
    where: { id: id },
    data: {
      demographic_info: {
        connect: {
          id: demographic.id,
        },
      },
    },
  })

  return parent
}

export const getDemographicInfo = async (id: string) => {
  const demographic = await prisma.demographic_info.findFirst({
    where: { parent: { id } },
  })

  return demographic
}

export const getParentChild = async (parentId: string, childId: string) => {
  return await prisma.student.findFirst({
    where: { parent: { id: parentId }, id: childId },
  })
}

export const addChildToClass = async (student: student, classId: string) => {
  const knowledge = await prisma.knowledge.create({
    data: {
      student: {
        connect: { id: student.id },
      },
      classes: {
        connect: { id: classId },
      },
    },
  })

  const updateStudent = await prisma.student.update({
    where: { id: student.id },
    data: {
      knowledge: {
        connect: { id: knowledge.id },
      },
    },
  })

  return updateStudent
}

export const changeParentPassword = async (email: string, password: string) => {
  const parent = await prisma.parent.findUnique({ where: { email } })

  if (parent) {
    parent.password = password

    return parent
  }
}

export const deleteParent = async (id: string) => {
  const delStudents = prisma.student.deleteMany({ where: { parentId: id } })
  const delParent = prisma.parent.delete({ where: { id } })

  return await prisma.$transaction([delStudents, delParent])
}

export const updateParent = async (parent: parent, requestData: Partial<parent>) => {
  if (requestData.birthday) {
    requestData.birthday = new Date(requestData.birthday)
  }
  return await prisma.parent.update({
    where: { id: parent.id },
    data: {
      ...requestData,
    },
  })
}
