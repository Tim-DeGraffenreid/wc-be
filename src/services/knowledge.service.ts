import prisma from '../utils/prisma'

export const getKnowledgeByStudentId = async (studentId: string) => {
  return await prisma.student_knowledge.findFirstOrThrow({ where: { studentId } })
}

export const checkClassScheduledForDay = async (studentId: string, date: Date) => {
  const existingClass = await prisma.student_knowledge.findFirst({
    where: {
      studentId,
      date: {
        equals: date,
      },
    },
  })
  return !!existingClass
}
