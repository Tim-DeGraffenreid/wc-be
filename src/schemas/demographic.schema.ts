import { boolean, object, string } from 'zod'
import { parentSchema } from './parents.schema'

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
