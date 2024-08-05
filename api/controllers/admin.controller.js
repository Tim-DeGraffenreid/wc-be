"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFromClassHandler = exports.unVerifyStudentHandler = exports.verifyStudentHandler = exports.getUpcomingClassesHandler = exports.forgotPasswordHandler = exports.deleteAdminController = exports.updateAdminController = exports.createAdminController = void 0;
const admin_service_1 = require("../services/admin.service");
const appError_1 = __importDefault(require("../utils/appError"));
const createAdminController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = res.locals.user;
        if (yield (0, admin_service_1.checkIfSuperAdmin)(id)) {
            const admin = yield (0, admin_service_1.addAdmin)(req.body);
            res.status(201).json({
                status: 'success',
                data: admin,
            });
        }
        else {
            throw new appError_1.default(400, 'You are not authorized to perform this action');
        }
    }
    catch (error) {
        next(error);
    }
});
exports.createAdminController = createAdminController;
const updateAdminController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const admin = yield (0, admin_service_1.updateAdmin)(id, req.body);
        res.status(200).json({
            status: 'success',
            data: admin,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateAdminController = updateAdminController;
const deleteAdminController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const admin = yield (0, admin_service_1.deleteAdmin)(id);
        res.status(204).json({
            status: 'success',
            data: admin,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteAdminController = deleteAdminController;
const forgotPasswordHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, password, phoneNumber } = req.body;
        const admin = yield (0, admin_service_1.findAdminByDetails)({ name, phoneNumber });
        const updatedAdmin = yield (0, admin_service_1.updateAdmin)(admin.id, { password });
        res.status(201).json({
            status: 'success',
            data: updatedAdmin,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.forgotPasswordHandler = forgotPasswordHandler;
const getUpcomingClassesHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const upcomingClasses = yield (0, admin_service_1.getUpcomingClasses)();
        res.status(200).json({
            status: 'success',
            data: upcomingClasses,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getUpcomingClassesHandler = getUpcomingClassesHandler;
const verifyStudentHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId, classId, date } = req.body;
        const { id } = res.locals.user;
        yield (0, admin_service_1.findAdminById)(id);
        const updatedData = yield (0, admin_service_1.verifyStudent)({ studentId, classId, date }, id);
        res.status(200).json({
            status: 'success',
            message: 'Student verified successfully',
            data: updatedData,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.verifyStudentHandler = verifyStudentHandler;
const unVerifyStudentHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId, classId, date } = req.body;
        const { id } = req.params;
        const updatedData = yield (0, admin_service_1.unVerifyStudent)(id, studentId, classId, date);
        res.status(200).json({
            status: 'success',
            message: 'Student unverified successfully',
            data: updatedData,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.unVerifyStudentHandler = unVerifyStudentHandler;
const deleteFromClassHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { classId } = req.body;
        const { id } = req.params;
        yield (0, admin_service_1.deleteStudentRegistration)(id);
        res.status(200).json({
            status: 'success',
            message: 'Student registration deleted successfully',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteFromClassHandler = deleteFromClassHandler;
//# sourceMappingURL=admin.controller.js.map