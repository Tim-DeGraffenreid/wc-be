import { Prisma, student } from '@prisma/client'
import { hashPassword } from '../utils/password.manager'
import prisma from '../utils/prisma'

export const getStudents = async () => {
  return await prisma.student.findMany({ include: { knowledge: true } })
}

export const createStudent = async (data: student) => {
  try {
    data.password = await hashPassword(data.password)
    data.birthday = new Date(data.birthday)
    const student = await prisma.student.create({
      data: {
        ...data,
      },
    })
    return { success: true, data: student }
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return { success: false, message: 'Email or phone number is already in use.' }
      }
      // Add more cases as needed
    } else if (error instanceof Prisma.PrismaClientValidationError) {
      return { success: false, message: 'Invalid data provided for creating a parent.' }
    } else {
      console.error('Error creating parent:', error)
      return { success: false, message: 'An error occurred while creating the parent.' }
    }
  }
}

export const findStudentByEmail = async ({ email }: { email: string }) => {
  return await prisma.student.findFirst({ where: { email } })
}

export const findStudentById = async (userId: string) => {
  return await prisma.student.findUniqueOrThrow({ where: { id: userId } })
}

export const addToClass = async (id: string, classId: string, date: Date) => {
  // if (date.getDay() !== 6) {
  //   throw new Error('Date must be a Saturday')
  // }

  // const currentDate = new Date()
  // if (date < currentDate) {
  //   throw new Error('Date cannot be in the past')
  // }

  const knowledge = await prisma.student_knowledge.create({
    data: {
      student: {
        connect: { id },
      },
      classes: {
        connect: { id: classId },
      },
      date,
    },
  })

  const updateStudent = await prisma.student.update({
    where: { id },
    data: {
      knowledge: {
        connect: { id: knowledge.id },
      },
    },
  })

  return updateStudent
}

export const updateStudent = async (student: student, requestData: Partial<student>) => {
  if (requestData.birthday) {
    requestData.birthday = new Date(requestData.birthday)
  }
  return await prisma.student.update({
    where: { id: student.id },
    data: {
      ...requestData,
    },
  })
}

export const getStudentClasses = async (id: string) => {
  return await prisma.student_knowledge.findMany({ where: { studentId: id } })
}

export const findStudentByDetails = async (data: any) => {
  const { fName, lName, phoneNumber, password } = data
  const response = await prisma.student.findFirstOrThrow({
    where: { fName, lName, phoneNumber },
  })

  if (response) {
    response.password = await hashPassword(password)
    await prisma.student.update({
      where: { id: response.id },
      data: { password: response.password },
    })
    return response
  }
}

export const deleteStudent = async (id: string) => {
  const delKnowledge = prisma.student_knowledge.deleteMany({ where: { studentId: id } })
  const delStudent = prisma.student.delete({ where: { id } })

  return await prisma.$transaction([delKnowledge, delStudent])
}
