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
exports.deleteStudent = exports.removeFromClass = exports.findStudentByDetails = exports.getStudentClasses = exports.updateStudent = exports.addToClass = exports.findStudentById = exports.findStudentByEmail = exports.createStudent = exports.getStudents = void 0;
const client_1 = require("@prisma/client");
const password_manager_1 = require("../utils/password.manager");
const prisma_1 = __importDefault(require("../utils/prisma"));
const getStudents = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.student.findMany({ include: { knowledge: true } });
});
exports.getStudents = getStudents;
const createStudent = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        data.password = yield (0, password_manager_1.hashPassword)(data.password);
        data.birthday = new Date(data.birthday);
        const student = yield prisma_1.default.student.create({
            data: Object.assign({}, data),
        });
        return { success: true, data: student };
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return { success: false, message: 'Email or phone number is already in use.' };
            }
            // Add more cases as needed
        }
        else if (error instanceof client_1.Prisma.PrismaClientValidationError) {
            return { success: false, message: 'Invalid data provided for creating a parent.' };
        }
        else {
            console.error('Error creating parent:', error);
            return { success: false, message: 'An error occurred while creating the parent.' };
        }
    }
});
exports.createStudent = createStudent;
const findStudentByEmail = ({ email }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.student.findFirst({ where: { email } });
});
exports.findStudentByEmail = findStudentByEmail;
const findStudentById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.student.findUniqueOrThrow({ where: { id: userId } });
});
exports.findStudentById = findStudentById;
const addToClass = (id, classId, date) => __awaiter(void 0, void 0, void 0, function* () {
    // if (date.getDay() !== 6) {
    //   throw new Error('Date must be a Saturday')
    // }
    // const currentDate = new Date()
    // if (date < currentDate) {
    //   throw new Error('Date cannot be in the past')
    // }
    const knowledge = yield prisma_1.default.student_knowledge.create({
        data: {
            student: {
                connect: { id },
            },
            classes: {
                connect: { id: classId },
            },
            date,
        },
    });
    const updateStudent = yield prisma_1.default.student.update({
        where: { id },
        data: {
            knowledge: {
                connect: { id: knowledge.id },
            },
        },
    });
    return updateStudent;
});
exports.addToClass = addToClass;
const updateStudent = (student, requestData) => __awaiter(void 0, void 0, void 0, function* () {
    if (requestData.birthday) {
        requestData.birthday = new Date(requestData.birthday);
    }
    return yield prisma_1.default.student.update({
        where: { id: student.id },
        data: Object.assign({}, requestData),
    });
});
exports.updateStudent = updateStudent;
const getStudentClasses = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.student_knowledge.findMany({ where: { studentId: id } });
});
exports.getStudentClasses = getStudentClasses;
const findStudentByDetails = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { fName, lName, phoneNumber, password } = data;
    const response = yield prisma_1.default.student.findFirstOrThrow({
        where: { fName, lName, phoneNumber },
    });
    if (response) {
        response.password = yield (0, password_manager_1.hashPassword)(password);
        yield prisma_1.default.student.update({
            where: { id: response.id },
            data: { password: response.password },
        });
        return response;
    }
});
exports.findStudentByDetails = findStudentByDetails;
const removeFromClass = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.student_knowledge.delete({
        where: {
            id,
        },
    });
});
exports.removeFromClass = removeFromClass;
const deleteStudent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const delKnowledge = prisma_1.default.student_knowledge.deleteMany({ where: { studentId: id } });
    const delStudent = prisma_1.default.student.delete({ where: { id } });
    return yield prisma_1.default.$transaction([delKnowledge, delStudent]);
});
exports.deleteStudent = deleteStudent;
//# sourceMappingURL=students.service.js.map