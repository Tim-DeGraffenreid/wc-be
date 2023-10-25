import express from "express";
import {
  deleteParentHandler,
  getParentHandler,
  getParentsHandler,
} from "../controllers/parents.controller";
import { validate } from "../middlewares/validate";
import {
  deleteParentSchema,
  getParentSchema,
  updateParentSchema,
} from "../schemas/parents.schema";

const router = express.Router();

router.route("/").get(getParentsHandler);
router
  .route("/:id")
  .get(validate(getParentSchema), getParentHandler)
  .patch(validate(updateParentSchema))
  .delete(validate(deleteParentSchema), deleteParentHandler);

export default router;
