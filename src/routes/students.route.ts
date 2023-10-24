import express from "express";
import {
  createStudent,
  deleteStudent,
  getStudent,
  getStudents,
} from "../controllers/students.controller";
import { validate } from "../middlewares/validate";
import { studentSchema } from "../schemas/student.schema";

const router = express.Router();

router.route("/").get(getStudents).post(validate(studentSchema), createStudent);
router.route("/:id").get(getStudent).patch().delete(deleteStudent);

export default router;
