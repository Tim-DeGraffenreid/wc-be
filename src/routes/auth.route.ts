import express from "express";
import { validate } from "../middlewares/validate";
import { parentSchema } from "../schemas/parents.schema";
import {
  getMeHandler,
  login,
  registerParent,
  registerStudent,
} from "../controllers/auth.controller";
import { studentSchema } from "../schemas/student.schema";
import { loginUserSchema } from "../schemas/auth.schema";
import { deserializeUser } from "../middlewares/deserializeUser";
import { requireUser } from "../middlewares/requireUser";

const router = express.Router();

//
router.route("/register/parent").post(validate(parentSchema), registerParent);
router.route("/login").post(validate(loginUserSchema), login);
router
  .route("/register/student")
  .post(validate(studentSchema), registerStudent);
router.route("/me").get(deserializeUser, requireUser, getMeHandler);
//

export default router;
