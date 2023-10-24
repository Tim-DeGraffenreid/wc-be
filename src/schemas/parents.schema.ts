import { AnyZodObject, TypeOf, array, boolean, date, object, optional, string } from 'zod'
import { demographicInfoSchema } from './demographic.schema'
import { studentSchema } from './student.schema'

export const parentSchema: AnyZodObject = object({
  body: object({
    email: string({ required_error: 'email is required' }).email('Must be an email'),
    password: string({ required_error: 'password is required' }).min(8),
    fName: string({ required_error: 'fName is required' }),
    lName: string({ required_error: 'lName is required' }),
    phoneNumber: string({ required_error: 'phoneNumber is required' }).regex(/^\d{10}$/),
    birthday: string({
      required_error: 'birthday is required',
    }).regex(/^\d{4}-\d{2}-\d{2}$/),
    educationLevel: string({ required_error: 'educationLevel is required' }),
    veteranStatus: string({ required_error: 'veteranStatus is required' }),
    regularTransportation: boolean({
      required_error: 'regularTransportation is required',
    }),
    housingStatus: string({ required_error: 'housingStatus is required' }),
    children: optional(array(studentSchema)),
    demographicInfo: optional(demographicInfoSchema),
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
    phoneNumber: string({ required_error: 'phoneNumber is required' }).regex(/^\d{10}$/),
    birthday: string({
      required_error: 'birthday is required',
    }).regex(/^\d{4}-\d{2}-\d{2}$/),
    educationLevel: string({ required_error: 'educationLevel is required' }),
    veteranStatus: string({ required_error: 'veteranStatus is required' }),
    regularTransportation: boolean({
      required_error: 'regularTransportation is required',
    }),
    housingStatus: string({ required_error: 'housingStatus is required' }),
    children: optional(array(studentSchema)),
    demographicInfo: optional(demographicInfoSchema),
  }).partial(),
})

export const deleteParentSchema = object({
  ...params,
})

export type CreateParentInput = TypeOf<typeof parentSchema>['body']
