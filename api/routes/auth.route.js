"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_1 = require("../middlewares/validate");
const parents_schema_1 = require("../schemas/parents.schema");
const auth_controller_1 = require("../controllers/auth.controller");
const student_schema_1 = require("../schemas/student.schema");
const auth_schema_1 = require("../schemas/auth.schema");
const deserializeUser_1 = require("../middlewares/deserializeUser");
const requireUser_1 = require("../middlewares/requireUser");
const router = express_1.default.Router();
//
router.route('/register/parent').post((0, validate_1.validate)(parents_schema_1.parentSchema), auth_controller_1.registerParent);
// router.route('/register/admin').post(validate(loginUserSchema), createAdminController)
router.route('/login').post((0, validate_1.validate)(auth_schema_1.loginUserSchema), auth_controller_1.login);
router.route('/admin/login').post((0, validate_1.validate)(auth_schema_1.loginAdminSchema), auth_controller_1.adminLogin);
router
    .route('/forgotPassword')
    .post((0, validate_1.validate)(auth_schema_1.forgotPasswordSchema), auth_controller_1.forgotPasswordHandler);
router.route('/register/student').post((0, validate_1.validate)(student_schema_1.studentSchema), auth_controller_1.registerStudent);
router.route('/me').get(deserializeUser_1.deserializeUser, requireUser_1.requireUser, auth_controller_1.getMeHandler);
router
    .route('/sendConfirmationEmail/')
    .post((0, validate_1.validate)(auth_schema_1.sendConfirmationEmailSchema), auth_controller_1.sendConfirmationEmailHandler);
router.route('/verifyEmail/:token').get((0, validate_1.validate)(auth_schema_1.verifyEmailSchema), auth_controller_1.verifyEmailHandler);
exports.default = router;
//# sourceMappingURL=auth.route.js.map