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
exports.removeChildFromClass = exports.updateParent = exports.deleteParent = exports.changeParentPassword = exports.addChildToClass = exports.getParentChild = exports.getDemographicInfo = exports.addDemographic = exports.getStudents = exports.createNewStudent = exports.findParentById = exports.findParentByEmail = exports.createParent = exports.getParents = void 0;
const password_manager_1 = require("../utils/password.manager");
const prisma_1 = __importDefault(require("../utils/prisma"));
const client_1 = require("@prisma/client");
const getParents = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.parent.findMany();
});
exports.getParents = getParents;
const createParent = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        data.password = yield (0, password_manager_1.hashPassword)(data.password);
        data.birthday = new Date(data.birthday);
        const parent = yield prisma_1.default.parent.create({
            data,
        });
        return { success: true, data: parent };
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return { success: false, message: 'Email or phone number is already in use.' };
            }
            // Add more cases as needed
        }
        else if (error instanceof client_1.Prisma.PrismaClientValidationError) {
            console.log(error.message);
            return { success: false, message: 'Invalid data provided for creating a parent.' };
        }
        else {
            console.error('Error creating parent:', error);
            return { success: false, message: 'An error occurred while creating the parent.' };
        }
    }
});
exports.createParent = createParent;
const findParentByEmail = ({ email }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.parent.findFirst({ where: { email } });
});
exports.findParentByEmail = findParentByEmail;
const findParentById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.parent.findUnique({
        where: { id: userId },
    });
});
exports.findParentById = findParentById;
const createNewStudent = (studentData, parentId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        studentData.birthday = new Date(studentData.birthday);
        studentData.password = yield (0, password_manager_1.hashPassword)(studentData.password);
        const student = yield prisma_1.default.student.create({
            data: Object.assign({}, studentData),
        });
        yield prisma_1.default.parent.update({
            where: { id: parentId },
            data: {
                student: {
                    connect: {
                        id: student.id,
                    },
                },
            },
        });
        return student;
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            throw new Error('A student with the provided data already exists.');
        }
        throw error;
    }
});
exports.createNewStudent = createNewStudent;
const getStudents = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.student.findMany({
        where: { parent: { id } },
        include: { knowledge: true },
    });
});
exports.getStudents = getStudents;
const addDemographic = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const demographic = yield prisma_1.default.demographic_info.create({
        data: Object.assign({}, data),
    });
    const parent = yield prisma_1.default.parent.update({
        where: { id: id },
        data: {
            demographic_info: {
                connect: {
                    id: demographic.id,
                },
            },
        },
    });
    return parent;
});
exports.addDemographic = addDemographic;
const getDemographicInfo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const demographic = yield prisma_1.default.demographic_info.findFirst({
        where: { parent: { id } },
    });
    return demographic;
});
exports.getDemographicInfo = getDemographicInfo;
const getParentChild = (parentId, childId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.student.findFirst({
        where: { parent: { id: parentId }, id: childId },
    });
});
exports.getParentChild = getParentChild;
const addChildToClass = (student, classId, date) => __awaiter(void 0, void 0, void 0, function* () {
    const knowledge = yield prisma_1.default.student_knowledge.create({
        data: {
            student: {
                connect: { id: student.id },
            },
            classes: {
                connect: { id: classId },
            },
            date
        },
    });
    const updateStudent = yield prisma_1.default.student.update({
        where: { id: student.id },
        data: {
            knowledge: {
                connect: { id: knowledge.id },
            },
        },
    });
    return updateStudent;
});
exports.addChildToClass = addChildToClass;
const changeParentPassword = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const parent = yield prisma_1.default.parent.findFirst({ where: { email } });
    if (parent) {
        parent.password = yield (0, password_manager_1.hashPassword)(password);
        yield prisma_1.default.parent.update({
            where: { id: parent.id },
            data: { password: parent.password },
        });
        return parent;
    }
});
exports.changeParentPassword = changeParentPassword;
const deleteParent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const delStudents = prisma_1.default.student.deleteMany({ where: { parentId: id } });
        const delParent = prisma_1.default.parent.delete({ where: { id } });
        return yield prisma_1.default.$transaction([delStudents, delParent]);
    }
    catch (error) {
        console.error('Error deleting parent:', error);
        return { success: false, message: 'An error occurred while deleting the parent.' };
    }
});
exports.deleteParent = deleteParent;
const updateParent = (parent, requestData) => __awaiter(void 0, void 0, void 0, function* () {
    if (requestData.birthday) {
        requestData.birthday = new Date(requestData.birthday);
    }
    return yield prisma_1.default.parent.update({
        where: { id: parent.id },
        data: Object.assign({}, requestData),
    });
});
exports.updateParent = updateParent;
const removeChildFromClass = (id, studentId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.student_knowledge.delete({
        where: {
            id,
            AND: {
                studentId,
            },
        }
    });
});
exports.removeChildFromClass = removeChildFromClass;
//# sourceMappingURL=parents.service.js.map