import express from 'express'
import { deleteParent, getParents } from '../controllers/parents.controller'
import { validate } from '../middlewares/validate'
import {
  deleteParentSchema,
  getParentSchema,
  updateParentSchema,
} from '../schemas/parents.schema'

const router = express.Router()

router.route('/').get(getParents)
router
  .route('/:id')
  // .get(validate(getParentSchema), getParent)
  .patch(validate(updateParentSchema))
  .delete(validate(deleteParentSchema), deleteParent)

export default router
