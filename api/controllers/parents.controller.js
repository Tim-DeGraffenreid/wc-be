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
exports.addChildImageHandler = exports.removeChildFromClassHandler = exports.addChildToClassHandler = exports.getDemographicHandler = exports.addDemographicHandler = exports.updateParentsHandler = exports.getStudentsHandler = exports.addStudentsHandler = exports.deleteParentHandler = exports.getParentHandler = exports.getParentsHandler = void 0;
const class_service_1 = require("../services/class.service");
const cloudinary_service_1 = require("../services/cloudinary.service");
const knowledge_service_1 = require("../services/knowledge.service");
const parents_service_1 = require("../services/parents.service");
const salesforce_service_1 = require("../services/salesforce.service");
const students_service_1 = require("../services/students.service");
const appError_1 = __importDefault(require("../utils/appError"));
const qr_generator_1 = require("../utils/qr_generator");
const getParentsHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parents = yield (0, parents_service_1.getParents)();
        res.status(200).json({
            status: 'success',
            parents,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getParentsHandler = getParentsHandler;
const getParentHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const parent = yield (0, parents_service_1.findParentById)(id);
        if (!parent) {
            return next(new appError_1.default(404, 'Parent with id does not exist'));
        }
        res.status(200).json({
            status: 'success',
            data: parent,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getParentHandler = getParentHandler;
const deleteParentHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const parent = yield (0, parents_service_1.findParentById)(id);
        const students = yield (0, parents_service_1.getStudents)(id);
        if (!parent) {
            return next(new appError_1.default(404, 'Parent with id does not exist'));
        }
        let salesforceSuccess = false;
        const deleteParentFromSalesforce = yield (0, salesforce_service_1.deleteUser)(parent.salesforceId, 'parent');
        if (deleteParentFromSalesforce) {
            const deleteStudentPromises = students.map((student) => __awaiter(void 0, void 0, void 0, function* () {
                yield (0, salesforce_service_1.deleteUser)(student.salesforceId, 'student');
            }));
            yield Promise.all(deleteStudentPromises);
            salesforceSuccess = true;
        }
        if (salesforceSuccess) {
            yield (0, parents_service_1.deleteParent)(id);
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
exports.deleteParentHandler = deleteParentHandler;
const addStudentsHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userType, id } = res.locals.user;
    if (userType !== 'parent') {
        return next(new appError_1.default(401, 'Unauthorized'));
    }
    try {
        // const checkIfExist = await checkSalesforceForDuplicates(
        //   req?.body?.email,
        //   req?.body?.phone
        // )
        // console.log(checkIfExist)
        // if (!checkIfExist!) {
        const student = yield (0, parents_service_1.createNewStudent)(Object.assign({}, req.body), id);
        const salesforce = yield (0, salesforce_service_1.addStudentWithRelationshipToSF)(req.body, id);
        //Add rollback if error adding to salesforce & send error code indicating such w/ message
        if (typeof salesforce === 'object' && salesforce.compositeResponse[0].body.id) {
            yield (0, students_service_1.updateStudent)(student, { salesforceId: salesforce.compositeResponse[0].body.id });
            student.salesforceId = salesforce.compositeResponse[0].body.id;
            res.status(201).json({
                status: 'success',
                data: student,
            });
        }
        else {
            const errorCodes = salesforce.compositeResponse
                .map((item) => item.body)
                .flat()
                .filter((bodyItem) => bodyItem.errorCode && bodyItem.errorCode !== "PROCESSING_HALTED")
                .map((filteredItem) => filteredItem.errorCode);
            yield (0, students_service_1.deleteStudent)(student.id);
            res.status(409).json({
                status: 'error',
                message: errorCodes.toString() || "An error occurred adding student to Salesforce.",
            });
        }
        // } else {
        //   res.status(409).json({
        //     status: 'error',
        //     message: 'Student with that email or phone number already exists',
        //   })
        // }
    }
    catch (error) {
        next(error);
    }
});
exports.addStudentsHandler = addStudentsHandler;
const getStudentsHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = res.locals.user;
    try {
        const students = yield (0, parents_service_1.getStudents)(id);
        res.status(200).json({
            status: 'success',
            students,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getStudentsHandler = getStudentsHandler;
const updateParentsHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        let parent = yield (0, parents_service_1.findParentById)(id);
        if (!parent) {
            return next(new appError_1.default(404, 'Parent with id does not exist'));
        }
        parent = yield (0, parents_service_1.updateParent)(parent, req.body);
        const salesforce = yield (0, salesforce_service_1.updateParentSalesforce)(parent.salesforceId, parent);
        if (salesforce) {
            res.status(200).json({
                status: 'success',
                data: parent,
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.updateParentsHandler = updateParentsHandler;
const addDemographicHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = res.locals.user;
        const updatedData = yield (0, parents_service_1.addDemographic)(id, req.body);
        res.status(201).json({
            status: 'success',
            data: {
                parent: updatedData,
            },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.addDemographicHandler = addDemographicHandler;
const getDemographicHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = res.locals.user;
        const data = yield (0, parents_service_1.getDemographicInfo)(id);
        res.status(200).json({
            status: 'success',
            data,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getDemographicHandler = getDemographicHandler;
const addChildToClassHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = res.locals.user;
        const { studentId, classId } = req.params;
        const { date } = req.body;
        const student = yield (0, parents_service_1.getParentChild)(id, studentId);
        const getClass = yield (0, class_service_1.findClassById)(classId);
        if (!student || !getClass) {
            return res.status(404).json({ error: 'Student or class not found' });
        }
        const checkClassScheduled = yield (0, knowledge_service_1.checkClassScheduledForDay)(studentId, date);
        if (checkClassScheduled) {
            return res.status(400).json({ error: 'Class already scheduled for that date' });
        }
        if (date < new Date()) {
            return res.status(400).json({ error: 'Date cannot be in the past' });
        }
        yield (0, parents_service_1.addChildToClass)(student, classId, date);
        const qrCode = yield (0, qr_generator_1.generateQRCode)({
            studentId,
            classId,
            date,
            studentName: `${student.fName} ${student.lName}`,
            className: getClass.name,
        });
        console.log(qrCode);
        res.status(201).json({
            status: 'success',
            message: 'Student added to class successfully',
            qrCode,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.addChildToClassHandler = addChildToClassHandler;
const removeChildFromClassHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId, id } = req.params;
        const { id: parentId } = res.locals.user;
        const student = yield (0, parents_service_1.getParentChild)(parentId, studentId);
        if (!student) {
            return res.status(404).json({ error: 'Student or class not found' });
        }
        yield (0, parents_service_1.removeChildFromClass)(id, studentId);
        res.status(200).json({
            status: 'success',
            message: 'Student removed from class successfully',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.removeChildFromClassHandler = removeChildFromClassHandler;
const addChildImageHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId } = req.params;
        const image = req.file;
        if (!image) {
            return next(new appError_1.default(400, 'No image provided'));
        }
        const student = yield (0, students_service_1.findStudentById)(studentId);
        if (!student) {
            return next(new appError_1.default(404, 'Student with id does not exist'));
        }
        if (student.profileImagePublicId && student.profileImageSecureUrl) {
            yield (0, cloudinary_service_1.deleteImage)(student.profileImagePublicId);
            student.profileImagePublicId = null;
            student.profileImageSecureUrl = null;
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
exports.addChildImageHandler = addChildImageHandler;
//# sourceMappingURL=parents.controller.js.map