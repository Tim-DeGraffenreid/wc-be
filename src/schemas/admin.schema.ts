import { AnyZodObject, object, string } from "zod";

export const parentSchema: AnyZodObject = object({
    body: object({
      email: string({ required_error: 'email is required' }).email('Must be an email'),
      password: string({ required_error: 'password is required' }).min(8),
      fName: string({ required_error: 'fName is required' }),
      lName: string({ required_error: 'lName is required' }),
      phoneNumber: string(),
    }),
  })