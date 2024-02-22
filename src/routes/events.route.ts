import express from 'express'
import { deserializeUser } from '../middlewares/deserializeUser'
import { requireUser } from '../middlewares/requireUser'
import { createEventhandler, getEventsHandler } from '../controllers/events.controller'
import { validate } from '../middlewares/validate'
import { createEventSchema } from '../schemas/events.schema'

const router = express.Router()

router
  .route('/new/:classId')
  .post(deserializeUser, requireUser, validate(createEventSchema), createEventhandler)
router.route('/').get(getEventsHandler)

export default router
