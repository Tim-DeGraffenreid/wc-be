import express from "express";
import {
  addStudentsHandler,
  deleteParentHandler,
  getParentHandler,
  getParentsHandler,
  getStudentsHandler,
} from "../controllers/parents.controller";
import { validate } from "../middlewares/validate";
import {
  deleteParentSchema,
  getParentSchema,
  updateParentSchema,
} from "../schemas/parents.schema";
import { studentSchema } from "../schemas/student.schema";
import { requireUser } from "../middlewares/requireUser";
import { deserializeUser } from "../middlewares/deserializeUser";

const router = express.Router();

router.route("/").get(getParentsHandler);
router.route("/students").get(deserializeUser, requireUser, getStudentsHandler);
router
  .route("/:id")
  .get(validate(getParentSchema), getParentHandler)
  .patch(validate(updateParentSchema))
  .delete(validate(deleteParentSchema), deleteParentHandler);
router
  .route("/students/new")
  .post(
    validate(studentSchema),
    deserializeUser,
    requireUser,
    addStudentsHandler
  );

export default router;
