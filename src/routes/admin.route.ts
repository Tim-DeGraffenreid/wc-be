import express from 'express'
import {
  createAdminController,
  deleteFromClassHandler,
  forgotPasswordHandler,
  getUpcomingClassesHandler,
  unVerifyStudentHandler,
  verifyStudentHandler,
} from '../controllers/admin.controller'
import { deserializeUser } from '../middlewares/deserializeUser'
import { checkIfAdmin } from '../middlewares/requireUser'
import { validate } from '../middlewares/validate'
import {
  adminSchema,
  deleteFromClassSchema,
  forgotPasswordSchema,
  unVerifyStudentSchema,
  verifyStudentSchema,
} from '../schemas/admin.schema'

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
router
  .route('/unverify-student/:id')
  .post(
    deserializeUser,
    checkIfAdmin,
    validate(unVerifyStudentSchema),
    unVerifyStudentHandler
  )

export default router
