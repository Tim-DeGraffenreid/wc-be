import express from 'express'
import { validate } from '../middlewares/validate'
import { parentSchema } from '../schemas/parents.schema'
import {
  adminLogin,
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
  loginAdminSchema,
  loginUserSchema,
  sendConfirmationEmailSchema,
  verifyEmailSchema,
} from '../schemas/auth.schema'
import { deserializeUser } from '../middlewares/deserializeUser'
import { requireUser } from '../middlewares/requireUser'
import { createAdminController } from '../controllers/admin.controller'

const router = express.Router()

//
router.route('/register/parent').post(validate(parentSchema), registerParent)
// router.route('/register/admin').post(validate(loginUserSchema), createAdminController)
router.route('/login').post(validate(loginUserSchema), login)
router.route('/admin/login').post(validate(loginAdminSchema), adminLogin)
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
