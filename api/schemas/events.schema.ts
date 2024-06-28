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
    }).datetime(),
    end_time: string({
      required_error: 'End time is required',
    }).datetime(),
    event_date: string({
      required_error: 'Event date is required',
    }).datetime(),
    location: string({
      required_error: 'Location is required',
    }),
    instructor: string({
      required_error: 'Instructor is required',
    }),
  }),
})

export const updateEventSchema = object({
  params: object({
    id: string({
      required_error: 'Event id is required',
    }),
  }),
  body: object({
    start_time: string().datetime(),
    end_time: string().datetime(),
    event_date: string().datetime(),
    location: string(),
    instructor: string(),
  }).partial(),
})
