import { AnyZodObject, object, string } from 'zod'

export const adminSchema: AnyZodObject = object({
  body: object({
    email: string({ required_error: 'email is required' }).email('Must be an email'),
    password: string({ required_error: 'password is required' }).min(8),
    name: string({ required_error: 'name is required' }),
    phoneNumber: string(),
  }),
})

export const forgotPasswordSchema: AnyZodObject = object({
  body: object({
    name: string({ required_error: 'name is required' }),
    phoneNumber: string(),
    password: string({ required_error: 'password is required' }).min(8),
  }),
})

export const verifyStudentSchema: AnyZodObject = object({
  body: object({
    studentId: string({ required_error: 'studentId is required' }),
    classId: string({ required_error: 'classId is required' }),
    date: string({ required_error: 'date is required' }).datetime(),
  }),
})

export const unVerifyStudentSchema: AnyZodObject = object({
  body: object({
    studentId: string({ required_error: 'studentId is required' }),
    classId: string({ required_error: 'classId is required' }),
    date: string({ required_error: 'date is required' }).datetime(),
  }),
  params: object({
    id: string({ required_error: 'id is required' }),
  }),
})

export const deleteFromClassSchema: AnyZodObject = object({
  params: object({
    id: string({ required_error: 'classId is required' }),
  }),
})
