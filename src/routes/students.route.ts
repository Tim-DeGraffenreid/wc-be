import express from "express";
import {
  addToClassHandler,
  createStudentHandler,
  deleteStudentHandler,
  getStudentHandler,
  getStudentsHandler,
  updateStudentHandler,
} from "../controllers/students.controller";
import { validate } from "../middlewares/validate";
import { studentSchema, updateStudentSchema } from "../schemas/student.schema";
import { deserializeUser } from "../middlewares/deserializeUser";
import { requireUser } from "../middlewares/requireUser";

const router = express.Router();

router
  .route("/")
  .get(getStudentsHandler)
  .post(validate(studentSchema), createStudentHandler);
router
  .route("/:id")
  .get(getStudentHandler)
  .patch(validate(updateStudentSchema), updateStudentHandler)
  .delete(deleteStudentHandler);
router
  .route("add-to-class/:classId")
  .post(deserializeUser, requireUser, addToClassHandler);

export default router;
