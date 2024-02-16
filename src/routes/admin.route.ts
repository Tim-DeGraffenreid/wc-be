import express from 'express'
import {
  createAdminController,
  forgotPasswordHandler,
  getUpcomingClassesHandler,
} from '../controllers/admin.controller'
import { validate } from '../middlewares/validate'
import { adminSchema, forgotPasswordSchema } from '../schemas/admin.schema'
import { requireUser } from '../middlewares/requireUser'
import { deserializeUser } from '../middlewares/deserializeUser'

const router = express.Router()

router
  .route('/forgot-password')
  .post(validate(forgotPasswordSchema), forgotPasswordHandler)
router
  .route('/new')
  .post(validate(adminSchema), deserializeUser, requireUser, createAdminController)
router
  .route('/upcoming-classes')
  .get(deserializeUser, requireUser, getUpcomingClassesHandler)

export default router
