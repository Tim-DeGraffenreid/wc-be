import { hashPassword } from '../utils/password.manager'
import prisma from '../utils/prisma'
import { Prisma, demographic_info, parent, student } from '@prisma/client'

export const getParents = async () => {
  return await prisma.parent.findMany()
}

export const createParent = async (data: Prisma.parentCreateInput) => {
  try {
    data.password = await hashPassword(data.password)
    data.birthday = new Date(data.birthday)

    const parent = await prisma.parent.create({
      data,
    })

    return { success: true, data: parent }
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return { success: false, message: 'Email or phone number is already in use.' }
      }
      // Add more cases as needed
    } else if (error instanceof Prisma.PrismaClientValidationError) {
      console.log(error.message)
      return { success: false, message: 'Invalid data provided for creating a parent.' }
    } else {
      console.error('Error creating parent:', error)
      return { success: false, message: 'An error occurred while creating the parent.' }
    }
  }
}

export const findParentByEmail = async ({ email }: { email: string }) => {
  return await prisma.parent.findFirst({ where: { email } })
}

export const findParentById = async (userId: string) => {
  return await prisma.parent.findUnique({
    where: { id: userId },
  })
}

export const createNewStudent = async (studentData: student, parentId: string) => {
  try {
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
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      throw new Error('A student with the provided data already exists.')
    }

    throw error
  }
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

export const addChildToClass = async (student: student, classId: string, date: Date) => {
  const knowledge = await prisma.student_knowledge.create({
    data: {
      student: {
        connect: { id: student.id },
      },
      classes: {
        connect: { id: classId },
      },
      date
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
  const parent = await prisma.parent.findFirst({ where: { email } })
  if (parent) {
    parent.password = await hashPassword(password)
    await prisma.parent.update({
      where: { id: parent.id },
      data: { password: parent.password },
    })
    return parent
  }
}

export const deleteParent = async (id: string) => {
  try {
    const delStudents = prisma.student.deleteMany({ where: { parentId: id } })
    const delParent = prisma.parent.delete({ where: { id } })

    return await prisma.$transaction([delStudents, delParent])
  } catch (error: any) {
    console.error('Error deleting parent:', error)
    return { success: false, message: 'An error occurred while deleting the parent.' }
  }
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

export const removeChildFromClass = async (id: string, studentId: string) => {
  return await prisma.student_knowledge.delete({
    where: {
      id,
      AND: {
        studentId,
      },
    }
  })
}