import express from 'express'
import { validate } from '../middlewares/validate'
import { parentSchema } from '../schemas/parents.schema'
import {
  forgotPasswordHandler,
  getMeHandler,
  login,
  registerParent,
  registerStudent,
  sendConfirmationEmailHandler,
  verifyEmailHandler,
} from '../controllers/auth.controller'
import { studentSchema } from '../schemas/student.schema'
import {
  forgotPasswordSchema,
  loginUserSchema,
  sendConfirmationEmailSchema,
  verifyEmailSchema,
} from '../schemas/auth.schema'
import { deserializeUser } from '../middlewares/deserializeUser'
import { requireUser } from '../middlewares/requireUser'

const router = express.Router()

//
router.route('/register/parent').post(validate(parentSchema), registerParent)
router.route('/login').post(validate(loginUserSchema), login)
router
  .route('/forgotPassword')
  .post(validate(forgotPasswordSchema), forgotPasswordHandler)
router.route('/register/student').post(validate(studentSchema), registerStudent)
router.route('/me').get(deserializeUser, requireUser, getMeHandler)
router
  .route('/sendConfirmationEmail/')
  .post(validate(sendConfirmationEmailSchema), sendConfirmationEmailHandler)
router.route('/verifyEmail/:token').get(validate(verifyEmailSchema), verifyEmailHandler)

export default router
