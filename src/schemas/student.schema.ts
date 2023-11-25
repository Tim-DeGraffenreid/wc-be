import { nativeEnum, object, string } from 'zod'
import { grades, student_gender_enum } from '@prisma/client'

export const studentSchema = object({
  body: object({
    email: string({ required_error: 'email is required' }).email(),
    password: string({ required_error: 'password is required' }).min(8),
    fName: string({ required_error: 'fName is required' }),
    lName: string({ required_error: 'lName is required' }),
    phoneNumber: string({ required_error: 'phoneNumber is required' }).regex(/^\d{10}$/),
    birthday: string({
      required_error: 'birthday is required',
    }).regex(/^\d{4}-\d{2}-\d{2}$/),
    grade: nativeEnum(grades),
    schoolName: string({ required_error: 'schoolName is required' }),
    gender: nativeEnum(student_gender_enum),
    zipCode: string({ required_error: 'zipCode is required' }).regex(/^\d{5}$/),
  }),
})

export const knowledgeSchema = object({
  body: object({
    student: studentSchema,
    grade: string(),
    class: string(),
    skills: string(),
  }),
})

const params = {
  params: object({
    id: string(),
  }),
}

export const getStudentSchema = object({
  ...params,
})

export const updateStudentSchema = object({
  ...params,
  body: object({
    email: string({ required_error: 'email is required' }).email(),
    password: string({ required_error: 'password is required' }).min(8),
    fName: string({ required_error: 'fName is required' }),
    lName: string({ required_error: 'lName is required' }),
    phoneNumber: string({ required_error: 'phoneNumber is required' }).regex(/^\d{10}$/),
    birthday: string({
      required_error: 'birthday is required',
    }).regex(/^\d{4}-\d{2}-\d{2}$/),
    grade: nativeEnum(grades),
    schoolName: string({ required_error: 'schoolName is required' }),
    gender: nativeEnum(student_gender_enum),
    zipCode: string({ required_error: 'zipCode is required' }).regex(/^\d{5}$/),
  }).partial(),
})

export const deleteStudentSchema = object({
  ...params,
})
