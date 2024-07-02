import express from 'express'
import {
  addToClassHandler,
  createStudentHandler,
  deleteStudentHandler,
  getStudentClassHandler,
  getStudentHandler,
  getStudentsHandler,
  removeFromClassHandler,
  updateStudentHandler,
  updateStudentImageHandler,
} from '../controllers/students.controller'
import { validate } from '../middlewares/validate'
import {
  addToClassSchema,
  removeFromClassSchema,
  studentSchema,
  updateStudentSchema,
} from '../schemas/student.schema'
import { deserializeUser } from '../middlewares/deserializeUser'
import { requireUser } from '../middlewares/requireUser'
import upload from '../middlewares/multer'

const router = express.Router()

router
  .route('/')
  .get(getStudentsHandler)
  .post(validate(studentSchema), createStudentHandler)
router.route('/classes').get(deserializeUser, requireUser, getStudentClassHandler)
router
  .route('/:id')
  .get(getStudentHandler)
  .patch(validate(updateStudentSchema), updateStudentHandler)
  .delete(deleteStudentHandler)
router
  .route('/add-to-class/:classId')
  .post(deserializeUser, requireUser, validate(addToClassSchema), addToClassHandler)
router
  .route('/remove-from-class/:id')
  .delete(deserializeUser, requireUser, validate(removeFromClassSchema), removeFromClassHandler)
router
  .route('/image')
  .post(deserializeUser, requireUser, upload.single('profile'), updateStudentImageHandler)

export default router
