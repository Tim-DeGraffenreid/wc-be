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
exports.updateStudentImageHandler = exports.getStudentClassHandler = exports.removeFromClassHandler = exports.addToClassHandler = exports.updateStudentHandler = exports.deleteStudentHandler = exports.getStudentHandler = exports.createStudentHandler = exports.getStudentsHandler = void 0;
const class_service_1 = require("../services/class.service");
const cloudinary_service_1 = require("../services/cloudinary.service");
const knowledge_service_1 = require("../services/knowledge.service");
const salesforce_service_1 = require("../services/salesforce.service");
const students_service_1 = require("../services/students.service");
const appError_1 = __importDefault(require("../utils/appError"));
const qr_generator_1 = require("../utils/qr_generator");
const getStudentsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const students = yield (0, students_service_1.getStudents)();
    res.status(200).json({
        status: 'success',
        students,
    });
});
exports.getStudentsHandler = getStudentsHandler;
const createStudentHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield (0, students_service_1.createStudent)(Object.assign({}, req.body));
        res.status(201).json({
            status: 'success',
            data: {
                student,
            },
        });
    }
    catch (error) {
        if ((error === null || error === void 0 ? void 0 : error.code) === '23505') {
            return res.status(409).json({
                status: 'fail',
                message: 'Student with email already exists',
            });
        }
    }
});
exports.createStudentHandler = createStudentHandler;
const getStudentHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const student = yield (0, students_service_1.findStudentById)(id);
        if (!student) {
            return next(new appError_1.default(404, 'Student with id does not exist'));
        }
        res.status(200).json({
            status: 'success',
            data: student,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getStudentHandler = getStudentHandler;
const deleteStudentHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const student = yield (0, students_service_1.findStudentById)(id);
        const deleteFromSalesforce = yield (0, salesforce_service_1.deleteUser)(student.salesforceId, 'student');
        if (deleteFromSalesforce) {
            if (!student) {
                return next(new appError_1.default(404, 'Student with id does not exist'));
            }
            yield (0, students_service_1.deleteStudent)(id);
            res.status(204).json({
                status: 'success',
                data: null,
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.deleteStudentHandler = deleteStudentHandler;
const updateStudentHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        let student = yield (0, students_service_1.findStudentById)(id);
        if (!student) {
            return next(new appError_1.default(404, 'Student with id does not exist'));
        }
        student = yield (0, students_service_1.updateStudent)(student, req.body);
        const salesforce = yield (0, salesforce_service_1.updateStudentSalesforce)(student.salesforceId, student);
        if (salesforce) {
            res.status(200).json({
                status: 'success',
                data: student,
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.updateStudentHandler = updateStudentHandler;
const addToClassHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { classId } = req.params;
        const { date } = req.body;
        const getClass = yield (0, class_service_1.findClassById)(classId);
        if (!getClass) {
            return res.status(404).json({ error: 'Class not found' });
        }
        const checkClassScheduled = yield (0, knowledge_service_1.checkClassScheduledForDay)(res.locals.user.id, date);
        if (checkClassScheduled) {
            return res.status(400).json({ error: 'Class already scheduled for that date' });
        }
        if (date < new Date()) {
            return res.status(400).json({ error: 'Date cannot be in the past' });
        }
        yield (0, students_service_1.addToClass)(res.locals.user.id, getClass.id, date);
        const qrCode = yield (0, qr_generator_1.generateQRCode)({
            studentId: res.locals.user.id,
            classId,
            date,
            studentName: `${res.locals.user.fName} ${res.locals.user.lName}`,
            className: getClass.name,
        });
        console.log(qrCode);
        res.status(201).json({
            status: 'success',
            message: 'Added to class successfully',
            qrCode,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.addToClassHandler = addToClassHandler;
const removeFromClassHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield (0, students_service_1.removeFromClass)(id);
        res.status(200).json({
            status: 'success',
            message: 'Removed from class successfully',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.removeFromClassHandler = removeFromClassHandler;
const getStudentClassHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = res.locals.user;
        const classes = yield (0, students_service_1.getStudentClasses)(id);
        res.status(200).json({
            status: 'success',
            classes,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getStudentClassHandler = getStudentClassHandler;
const updateStudentImageHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = res.locals.user;
        const image = req.file;
        if (!image) {
            return next(new appError_1.default(400, 'No image provided'));
        }
        const student = yield (0, students_service_1.findStudentById)(id);
        if (!student) {
            return next(new appError_1.default(404, 'Student with id does not exist'));
        }
        const b64 = Buffer.from(image.buffer).toString('base64');
        let dataURI = 'data:' + image.mimetype + ';base64,' + b64;
        const { public_id, secure_url } = yield (0, cloudinary_service_1.uploadImage)(dataURI);
        const updatedStudent = yield (0, students_service_1.updateStudent)(student, {
            profileImagePublicId: public_id,
            profileImageSecureUrl: secure_url,
        });
        res.status(200).json({
            status: 'success',
            data: updatedStudent,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateStudentImageHandler = updateStudentImageHandler;
//# sourceMappingURL=students.controller.js.map