"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const parents_controller_1 = require("../controllers/parents.controller");
const deserializeUser_1 = require("../middlewares/deserializeUser");
const multer_1 = __importDefault(require("../middlewares/multer"));
const requireUser_1 = require("../middlewares/requireUser");
const validate_1 = require("../middlewares/validate");
const parents_schema_1 = require("../schemas/parents.schema");
const student_schema_1 = require("../schemas/student.schema");
const router = express_1.default.Router();
router.route('/').get(parents_controller_1.getParentsHandler);
router.route('/students').get(deserializeUser_1.deserializeUser, requireUser_1.requireUser, parents_controller_1.getStudentsHandler);
router
    .route('/demographic')
    .post((0, validate_1.validate)(parents_schema_1.demographicInfoSchema), deserializeUser_1.deserializeUser, requireUser_1.requireUser, parents_controller_1.addDemographicHandler);
router.route('/demographic').get(deserializeUser_1.deserializeUser, requireUser_1.requireUser, parents_controller_1.getDemographicHandler);
router
    .route('/:id')
    .get((0, validate_1.validate)(parents_schema_1.getParentSchema), parents_controller_1.getParentHandler)
    .patch((0, validate_1.validate)(parents_schema_1.updateParentSchema), parents_controller_1.updateParentsHandler)
    .delete((0, validate_1.validate)(parents_schema_1.deleteParentSchema), parents_controller_1.deleteParentHandler);
router
    .route('/students/new')
    .post((0, validate_1.validate)(student_schema_1.studentSchema), deserializeUser_1.deserializeUser, requireUser_1.requireUser, parents_controller_1.addStudentsHandler);
router
    .route('/add-to-class/:studentId/:classId')
    .post(deserializeUser_1.deserializeUser, requireUser_1.requireUser, (0, validate_1.validate)(parents_schema_1.addToClassSchema), parents_controller_1.addChildToClassHandler);
router
    .route('/remove-from-class/:id/:studentId')
    .delete(deserializeUser_1.deserializeUser, requireUser_1.requireUser, (0, validate_1.validate)(parents_schema_1.removeFromClassSchema), parents_controller_1.removeChildFromClassHandler);
router
    .route('/:studentId/image')
    .post(deserializeUser_1.deserializeUser, requireUser_1.requireUser, multer_1.default.single('profile'), parents_controller_1.addChildImageHandler);
exports.default = router;
//# sourceMappingURL=parents.route.js.map