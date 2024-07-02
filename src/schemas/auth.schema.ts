import { TypeOf, ZodEnum, nativeEnum, object, string } from 'zod'

enum UserType {
  PARENT = 'parent',
  STUDENT = 'student',
}

export const loginUserSchema = object({
  body: object({
    email: string({
      required_error: 'Email address is required',
    }).email('Invalid email address'),
    password: string({
      required_error: 'Password is required',
    }),
    userType: nativeEnum(UserType),
  }),
})

export const loginAdminSchema = object({
  body: object({
    email: string({
      required_error: 'Email address is required',
    }).email('Invalid email address'),
    password: string({
      required_error: 'Password is required',
    }),
  }),
})

export const forgotPasswordSchema = object({
  body: object({
    fName: string().optional(),
    lName: string().optional(),
    phoneNumber: string({ required_error: 'phoneNumber is required' })
      .regex(/^\d{10}$/)
      .optional(),
    password: string(),
    userType: string(),
    email: string().email().optional(),
  }),
})

export const sendConfirmationEmailSchema = object({
  body: object({
    email: string({
      required_error: 'Email address is required',
    }).email('Invalid email address'),
    userType: nativeEnum(UserType),
  }),
})

export const verifyEmailSchema = object({
  query: object({
    token: string({
      required_error: 'Token is required',
    }),
  }),
})
