import express from "express";
import { createStudentHandler, deleteStudentHandler, getStudentHandler, getStudentsHandler } from "../controllers/students.controller";
import { validate } from "../middlewares/validate";
import { studentSchema } from "../schemas/student.schema";

const router = express.Router();

router.route("/").get(getStudentsHandler).post(validate(studentSchema), createStudentHandler);
router.route("/:id").get(getStudentHandler).patch().delete(deleteStudentHandler);

export default router;
