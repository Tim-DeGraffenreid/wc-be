import express from "express";
import { validate } from "../middlewares/validate";
import { parentSchema } from "../schemas/parents.schema";
import {
  login,
  registerParent,
  registerStudent,
} from "../controllers/auth.controller";
import { studentSchema } from "../schemas/student.schema";
import { loginUserSchema } from "../schemas/auth.schema";

const router = express.Router();

router.route("/register/parent").post(validate(parentSchema), registerParent);
router.route("/login").post(validate(loginUserSchema), login);
router
  .route("/register/student")
  .post(validate(studentSchema), registerStudent);
router.route("/me").get();
router.route("/refresh").get();

export default router;
