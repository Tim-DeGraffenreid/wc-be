import { hashPassword } from '../utils/password.manager'
import prisma from '../utils/prisma'
import { student } from '@prisma/client'

export const getStudents = async () => {
  return await prisma.student.findMany()
}

export const createStudent = async (data: any) => {
  data.password = await hashPassword(data.password)
  data.birthday = new Date(data.birthday).toISOString()
  return await prisma.student.create({
    data: {
      ...data,
    },
  })
}

export const findStudentByEmail = async ({ email }: { email: string }) => {
  return await prisma.student.findUniqueOrThrow({ where: { email } })
}

export const findStudentById = async (userId: string) => {
  return await prisma.student.findUniqueOrThrow({ where: { id: userId } })
}

export const addToClass = async (student: student, classId: string) => {
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

export const updateStudent = async (student: student, requestData: Partial<student>) => {
  return await prisma.student.update({
    where: { id: student.id },
    data: {
      ...requestData,
    },
  })
}

export const getStudentClasses = async (id: string) => {
  return await prisma.knowledge.findFirst({ where: { studentId: id } })
}

export const findStudentByDetails = async (data: any) => {
  const { fName, lName, phoneNumber, password } = data
  const response = await prisma.student.findFirstOrThrow({
    where: { fName, lName, phoneNumber },
  })

  if (response) {
    response.password = await hashPassword(password)
    await prisma.student.update({ where: { id: response.id }, data: { ...response } })
    return response
  }
}

export const deleteStudent = async (id: string) => {
  const delKnowledge = prisma.knowledge.deleteMany({ where: { studentId: id } })
  const delStudent = prisma.student.delete({ where: { id } })

  return await prisma.$transaction([delKnowledge, delStudent])
}
