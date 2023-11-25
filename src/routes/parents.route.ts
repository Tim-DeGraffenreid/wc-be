import express from 'express'
import {
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
  deleteParentSchema,
  demographicInfoSchema,
  getParentSchema,
  updateParentSchema,
} from '../schemas/parents.schema'
import { studentSchema } from '../schemas/student.schema'
import { requireUser } from '../middlewares/requireUser'
import { deserializeUser } from '../middlewares/deserializeUser'

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
router
  .route('/demographic')
  .get(
    deserializeUser,
    requireUser,
    getDemographicHandler
  )
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
  .post(deserializeUser, requireUser, addChildToClassHandler)

export default router
