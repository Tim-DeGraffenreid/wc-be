import prisma from '../utils/prisma'

export const getKnowledgeByStudentId = async (studentId: string) => {
  return await prisma.student_knowledge.findFirstOrThrow({ where: { studentId } })
}
