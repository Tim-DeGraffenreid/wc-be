import { AnyZodObject, object, string } from 'zod'
import { studentSchema } from './student.schema'

export const knowledgeSchema: AnyZodObject = object({
  body: object({
    student: studentSchema,
    grade: string(),
    language: string(),
    skills: string(),
  }),
})
