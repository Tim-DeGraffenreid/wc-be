import express from "express";
import {
  deleteClassHandler,
  getClassByIdHandler,
  getClassesHandler,
  updateClassHandler,
} from "../controllers/class.controller";
import { validate } from "../middlewares/validate";
import {
  deleteClassSchema,
  getClassSchema,
  updateClassSchema,
} from "../schemas/class.schema";

const router = express.Router();

router.route("/").get(getClassesHandler);
router
  .route("/:id")
  .get(validate(getClassSchema), getClassByIdHandler)
  .delete(validate(deleteClassSchema), deleteClassHandler)
  .patch(validate(updateClassSchema), updateClassHandler);

export default router;
