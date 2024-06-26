"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const students_controller_1 = require("../controllers/students.controller");
const validate_1 = require("../middlewares/validate");
const student_schema_1 = require("../schemas/student.schema");
const deserializeUser_1 = require("../middlewares/deserializeUser");
const requireUser_1 = require("../middlewares/requireUser");
const multer_1 = __importDefault(require("../middlewares/multer"));
const router = express_1.default.Router();
router
    .route('/')
    .get(students_controller_1.getStudentsHandler)
    .post((0, validate_1.validate)(student_schema_1.studentSchema), students_controller_1.createStudentHandler);
router.route('/classes').get(deserializeUser_1.deserializeUser, requireUser_1.requireUser, students_controller_1.getStudentClassHandler);
router
    .route('/:id')
    .get(students_controller_1.getStudentHandler)
    .patch((0, validate_1.validate)(student_schema_1.updateStudentSchema), students_controller_1.updateStudentHandler)
    .delete(students_controller_1.deleteStudentHandler);
router
    .route('/add-to-class/:classId')
    .post(deserializeUser_1.deserializeUser, requireUser_1.requireUser, (0, validate_1.validate)(student_schema_1.addToClassSchema), students_controller_1.addToClassHandler);
router
    .route('/remove-from-class/:id')
    .delete(deserializeUser_1.deserializeUser, requireUser_1.requireUser, (0, validate_1.validate)(student_schema_1.removeFromClassSchema), students_controller_1.removeFromClassHandler);
router
    .route('/image')
    .post(deserializeUser_1.deserializeUser, requireUser_1.requireUser, multer_1.default.single('profile'), students_controller_1.updateStudentImageHandler);
exports.default = router;
//# sourceMappingURL=students.route.js.map