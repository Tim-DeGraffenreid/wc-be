import { object, string } from 'zod'

export const createEventSchema = object({
  params: object({
    classId: string({
      required_error: 'Class id is required',
    }),
  }),
  body: object({
    start_time: string({
      required_error: 'Start time is required',
    }).datetime('Start time must be in the future'),
    end_time: string({
      required_error: 'End time is required',
    }).datetime('End time must be after start time'),
    location: string({
      required_error: 'Location is required',
    }),
    instructor: string({
      required_error: 'Instructor is required',
    }),
  }),
})
