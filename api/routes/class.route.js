"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const class_controller_1 = require("../controllers/class.controller");
const validate_1 = require("../middlewares/validate");
const class_schema_1 = require("../schemas/class.schema");
const router = express_1.default.Router();
router
    .route("/")
    .get(class_controller_1.getClassesHandler)
    .post((0, validate_1.validate)(class_schema_1.classSchema), class_controller_1.addClassHandler);
router
    .route("/:id")
    .get((0, validate_1.validate)(class_schema_1.getClassSchema), class_controller_1.getClassByIdHandler)
    .delete((0, validate_1.validate)(class_schema_1.deleteClassSchema), class_controller_1.deleteClassHandler)
    .patch((0, validate_1.validate)(class_schema_1.updateClassSchema), class_controller_1.updateClassHandler);
exports.default = router;
//# sourceMappingURL=class.route.js.map