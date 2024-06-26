"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("../controllers/admin.controller");
const deserializeUser_1 = require("../middlewares/deserializeUser");
const requireUser_1 = require("../middlewares/requireUser");
const validate_1 = require("../middlewares/validate");
const admin_schema_1 = require("../schemas/admin.schema");
const router = express_1.default.Router();
router
    .route('/forgot-password')
    .post((0, validate_1.validate)(admin_schema_1.forgotPasswordSchema), admin_controller_1.forgotPasswordHandler);
router
    .route('/new')
    .post((0, validate_1.validate)(admin_schema_1.adminSchema), deserializeUser_1.deserializeUser, requireUser_1.checkIfAdmin, admin_controller_1.createAdminController);
router
    .route('/upcoming-classes')
    .get(deserializeUser_1.deserializeUser, requireUser_1.checkIfAdmin, admin_controller_1.getUpcomingClassesHandler);
router
    .route('/verify-student')
    .post(deserializeUser_1.deserializeUser, requireUser_1.checkIfAdmin, (0, validate_1.validate)(admin_schema_1.verifyStudentSchema), admin_controller_1.verifyStudentHandler);
router
    .route('/unverify-student/:id')
    .post(deserializeUser_1.deserializeUser, requireUser_1.checkIfAdmin, (0, validate_1.validate)(admin_schema_1.unVerifyStudentSchema), admin_controller_1.unVerifyStudentHandler);
exports.default = router;
//# sourceMappingURL=admin.route.js.map