import { NextFunction, Request, Response } from 'express'
import { findClassById } from '../services/class.service'
import {
  checkEventsScheduledForDay,
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from '../services/events.service'

export const createEventhandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { start_time, event_date } = req.body
    const { classId } = req.params
    await findClassById(classId)

    const checkEvent = await checkEventsScheduledForDay(start_time, event_date)

    if (checkEvent) {
      res.status(400).json({ error: 'Event already scheduled for that date and time' })
    }

    const event = await createEvent({ ...req.body, class: { connect: { id: classId } } })

    res.status(201).json({
      status: 'success',
      event,
    })
  } catch (error) {
    next(error)
  }
}

export const getEventsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const events = await getEvents()

    res.status(200).json({
      status: 'success',
      events,
    })
  } catch (error) {
    next(error)
  }
}

export const deleteEventHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const event = await deleteEvent(id)

    res.status(204).json({
      status: 'success',
      data: event,
    })
  } catch (error) {
    next(error)
  }
}

export const updateEventHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const event = await updateEvent(id, req.body)

    res.status(200).json({
      status: 'success',
      data: event,
    })
  } catch (error) {
    next(error)
  }
}
