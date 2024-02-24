import express from 'express'
import {
  createAdminController,
  forgotPasswordHandler,
  getUpcomingClassesHandler,
  verifyStudentHandler,
} from '../controllers/admin.controller'
import { validate } from '../middlewares/validate'
import {
  adminSchema,
  forgotPasswordSchema,
  verifyStudentSchema,
} from '../schemas/admin.schema'
import { checkIfAdmin } from '../middlewares/requireUser'
import { deserializeUser } from '../middlewares/deserializeUser'

const router = express.Router()

router
  .route('/forgot-password')
  .post(validate(forgotPasswordSchema), forgotPasswordHandler)
router
  .route('/new')
  .post(validate(adminSchema), deserializeUser, checkIfAdmin, createAdminController)
router
  .route('/upcoming-classes')
  .get(deserializeUser, checkIfAdmin, getUpcomingClassesHandler)
router
  .route('/verify-student')
  .post(
    deserializeUser,
    checkIfAdmin,
    validate(verifyStudentSchema),
    verifyStudentHandler
  )

export default router
