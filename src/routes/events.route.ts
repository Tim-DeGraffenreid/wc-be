import express from 'express'
import {
  createEventhandler,
  deleteEventHandler,
  getEventsHandler,
  updateEventHandler,
} from '../controllers/events.controller'
import { deserializeUser } from '../middlewares/deserializeUser'
import { checkIfAdmin } from '../middlewares/requireUser'
import { validate } from '../middlewares/validate'
import { createEventSchema, updateEventSchema } from '../schemas/events.schema'

const router = express.Router()

router
  .route('/new/:classId')
  .post(deserializeUser, checkIfAdmin, validate(createEventSchema), createEventhandler)
router.route('/').get(getEventsHandler)
router
  .route('/:id')
  .delete(deserializeUser, checkIfAdmin, deleteEventHandler)
  .patch(deserializeUser, checkIfAdmin, validate(updateEventSchema), updateEventHandler)

export default router
