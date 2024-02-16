import express from 'express'
import {
  addChildImageHandler,
  addChildToClassHandler,
  addDemographicHandler,
  addStudentsHandler,
  deleteParentHandler,
  getDemographicHandler,
  getParentHandler,
  getParentsHandler,
  getStudentsHandler,
  updateParentsHandler,
} from '../controllers/parents.controller'
import { validate } from '../middlewares/validate'
import {
  addToClassSchema,
  deleteParentSchema,
  demographicInfoSchema,
  getParentSchema,
  updateParentSchema,
} from '../schemas/parents.schema'
import { studentSchema } from '../schemas/student.schema'
import { requireUser } from '../middlewares/requireUser'
import { deserializeUser } from '../middlewares/deserializeUser'
import upload from '../middlewares/multer'

const router = express.Router()

router.route('/').get(getParentsHandler)
router.route('/students').get(deserializeUser, requireUser, getStudentsHandler)
router
  .route('/demographic')
  .post(
    validate(demographicInfoSchema),
    deserializeUser,
    requireUser,
    addDemographicHandler
  )
router.route('/demographic').get(deserializeUser, requireUser, getDemographicHandler)
router
  .route('/:id')
  .get(validate(getParentSchema), getParentHandler)
  .patch(validate(updateParentSchema), updateParentsHandler)
  .delete(validate(deleteParentSchema), deleteParentHandler)
router
  .route('/students/new')
  .post(validate(studentSchema), deserializeUser, requireUser, addStudentsHandler)
router
  .route('/add-to-class/:studentId/:classId')
  .post(deserializeUser, requireUser, validate(addToClassSchema), addChildToClassHandler)
router
  .route('/:studentId/image')
  .post(deserializeUser, requireUser, upload.single('profile'), addChildImageHandler)

export default router
