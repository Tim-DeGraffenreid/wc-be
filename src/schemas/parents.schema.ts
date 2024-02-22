import { AnyZodObject, array, boolean, nativeEnum, object, optional, string } from 'zod'
import { studentSchema } from './student.schema'
import { educationLevel, housingStatus, veteranStatus } from '@prisma/client'

export const parentSchema: AnyZodObject = object({
  body: object({
    email: string({ required_error: 'email is required' }).email('Must be an email'),
    password: string({ required_error: 'password is required' }).min(8),
    fName: string({ required_error: 'fName is required' }),
    lName: string({ required_error: 'lName is required' }),
    phoneNumber: string(),
    birthday: string({
      required_error: 'birthday is required',
    }).regex(/^\d{4}-\d{2}-\d{2}$/),
    educationLevel: nativeEnum(educationLevel),
    veteranStatus: nativeEnum(veteranStatus),
    regularTransportation: boolean({
      required_error: 'regularTransportation is required',
    }),
    housingStatus: nativeEnum(housingStatus),
    children: optional(array(studentSchema)),
  }),
})

export const demographicInfoSchema = object({
  body: object({
    parent: parentSchema,
    zipCode: string().regex(/^\d{5}$/), // Assuming a 5-digit ZIP code
    address: string(),
    foodStampEligible: boolean(),
    ethnicity: string(),
    householdIncome: string(),
    disclaimerAccepted: boolean(),
  }),
})

const params = {
  params: object({
    id: string(),
  }),
}

export const getParentSchema = object({
  ...params,
})

export const updateParentSchema = object({
  ...params,
  body: object({
    email: string({ required_error: 'email is required' }).email('Must be an email'),
    password: string({ required_error: 'password is required' }).min(8),
    fName: string({ required_error: 'fName is required' }),
    lName: string({ required_error: 'lName is required' }),
    phoneNumber: string(),
    birthday: string({
      required_error: 'birthday is required',
    }).regex(/^\d{4}-\d{2}-\d{2}$/),
    educationLevel: nativeEnum(educationLevel),
    veteranStatus: nativeEnum(veteranStatus),
    regularTransportation: boolean({
      required_error: 'regularTransportation is required',
    }),
    housingStatus: nativeEnum(housingStatus),
    children: optional(array(studentSchema)),
    demographicInfo: optional(demographicInfoSchema),
  }).partial(),
})

export const deleteParentSchema = object({
  ...params,
})

export const addToClassSchema = object({
  params: object({
    studentId: string(),
    classId: string(),
  }),
  body: object({
    date: string({ required_error: 'date is required' }).datetime(),
  }),
})
