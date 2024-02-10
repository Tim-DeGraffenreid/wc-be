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
