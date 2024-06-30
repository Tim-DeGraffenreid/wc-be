import express from "express";
import {
  addClassHandler,
  deleteClassHandler,
  getClassByIdHandler,
  getClassesHandler,
  updateClassHandler,
} from "../controllers/class.controller";
import { validate } from "../middlewares/validate";
import {
  classSchema,
  deleteClassSchema,
  getClassSchema,
  updateClassSchema,
} from "../schemas/class.schema";

const router = express.Router();

router
  .route("/")
  .get(getClassesHandler)
  .post(validate(classSchema), addClassHandler);
router
  .route("/:id")
  .get(validate(getClassSchema), getClassByIdHandler)
  .delete(validate(deleteClassSchema), deleteClassHandler)
  .patch(validate(updateClassSchema), updateClassHandler);

export default router;
