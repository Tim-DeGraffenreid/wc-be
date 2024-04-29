import { Prisma } from '@prisma/client'
import { hashPassword } from '../utils/password.manager'
import prisma from '../utils/prisma'

export const addAdmin = async (data: Prisma.adminCreateInput) => {
  try {
    data.password = await hashPassword(data.password)
    return await prisma.admin.create({
      data,
    })
  } catch (error) {
    throw error
  }
}

export const updateAdmin = async (id: string, data: Partial<Prisma.adminUpdateInput>) => {
  try {
    if (data.password) {
      data.password = await hashPassword(data.password as string)
    }
    return await prisma.admin.update({ where: { id }, data })
  } catch (error) {
    throw error
  }
}

export const findAdminById = async (id: string) => {
  return await prisma.admin.findUniqueOrThrow({ where: { id } })
}

export const deleteAdmin = async (id: string) => {
  try {
    return await prisma.admin.delete({ where: { id } })
  } catch (error) {}
}

export const checkIfSuperAdmin = async (id: string) => {
  const admin = await prisma.admin.findUnique({
    where: { id },
  })

  return admin?.isAdmin
}

export const findAdminByDetails = (data: any) => {
  const { name, phoneNumber } = data
  return prisma.admin.findFirstOrThrow({ where: { name, phoneNumber } })
}

export const getUpcomingClasses = () => {
  return prisma.student_knowledge.findMany({
    where: {
      date: {
        gte: new Date(),
      },
    },
    include: {
      student: true,
      classes: true,
    },
    orderBy: {
      date: 'asc',
    },
  })
}

export const verifyStudent = async (
  verificationData: { date: string; studentId: string; classId: string },
  verificatorId: string
) => {
  const { date, studentId, classId } = verificationData
  const knowledgeData = await prisma.student_knowledge.findFirst({
    where: {
      studentId,
      classId,
      date: {
        equals: new Date(date),
      },
    },
  })

  return prisma.student_knowledge.update({
    where: {
      id: knowledgeData?.id,
    },
    data: {
      adminId: verificatorId,
      verify: true,
    },
    select: {
      classes: true,
      student: true,
    },
  })
}

// TODO: unverify student
export const unVerifyStudent = (
  id: string,
  studentId: string,
  classId: string,
  date: string
) => {
  return prisma.student_knowledge.update({
    where: {
      id,
      AND: {
        studentId,
        classId,
        date: {
          equals: new Date(date),
        },
      },
    },
    data: {
      adminId: null,
      verify: false,
      verifiedDate: null,
    },
  })
}

// TODO: delete student registration for a class
export const deleteStudentRegistration = (id: string) => {
  return prisma.student_knowledge.delete({
    where: {
      id,
    },
  })
}
