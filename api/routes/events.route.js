"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const events_controller_1 = require("../controllers/events.controller");
const deserializeUser_1 = require("../middlewares/deserializeUser");
const requireUser_1 = require("../middlewares/requireUser");
const validate_1 = require("../middlewares/validate");
const events_schema_1 = require("../schemas/events.schema");
const router = express_1.default.Router();
router
    .route('/new/:classId')
    .post(deserializeUser_1.deserializeUser, requireUser_1.checkIfAdmin, (0, validate_1.validate)(events_schema_1.createEventSchema), events_controller_1.createEventhandler);
router.route('/').get(events_controller_1.getEventsHandler);
router
    .route('/:id')
    .delete(deserializeUser_1.deserializeUser, requireUser_1.checkIfAdmin, events_controller_1.deleteEventHandler)
    .patch(deserializeUser_1.deserializeUser, requireUser_1.checkIfAdmin, (0, validate_1.validate)(events_schema_1.updateEventSchema), events_controller_1.updateEventHandler);
exports.default = router;
//# sourceMappingURL=events.route.js.map