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
exports.deleteStudentRegistration = exports.unVerifyStudent = exports.verifyStudent = exports.getUpcomingClasses = exports.findAdminByDetails = exports.checkIfSuperAdmin = exports.deleteAdmin = exports.findAdminById = exports.updateAdmin = exports.addAdmin = void 0;
const password_manager_1 = require("../utils/password.manager");
const prisma_1 = __importDefault(require("../utils/prisma"));
const addAdmin = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        data.password = yield (0, password_manager_1.hashPassword)(data.password);
        return yield prisma_1.default.admin.create({
            data,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.addAdmin = addAdmin;
const updateAdmin = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (data.password) {
            data.password = yield (0, password_manager_1.hashPassword)(data.password);
        }
        return yield prisma_1.default.admin.update({ where: { id }, data });
    }
    catch (error) {
        throw error;
    }
});
exports.updateAdmin = updateAdmin;
const findAdminById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.admin.findUniqueOrThrow({ where: { id } });
});
exports.findAdminById = findAdminById;
const deleteAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_1.default.admin.delete({ where: { id } });
    }
    catch (error) { }
});
exports.deleteAdmin = deleteAdmin;
const checkIfSuperAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield prisma_1.default.admin.findUnique({
        where: { id },
    });
    return admin === null || admin === void 0 ? void 0 : admin.isAdmin;
});
exports.checkIfSuperAdmin = checkIfSuperAdmin;
const findAdminByDetails = (data) => {
    const { name, phoneNumber } = data;
    return prisma_1.default.admin.findFirstOrThrow({ where: { name, phoneNumber } });
};
exports.findAdminByDetails = findAdminByDetails;
const getUpcomingClasses = () => {
    return prisma_1.default.student_knowledge.findMany({
        where: {
            date: {
                gte: new Date(),
            },
        },
        include: {
            student: true,
            classes: true,
        },
        orderBy: {
            date: 'asc',
        },
    });
};
exports.getUpcomingClasses = getUpcomingClasses;
const verifyStudent = (verificationData, verificatorId) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, studentId, classId } = verificationData;
    const knowledgeData = yield prisma_1.default.student_knowledge.findFirst({
        where: {
            studentId,
            classId,
            date: {
                equals: new Date(date),
            },
        },
    });
    return prisma_1.default.student_knowledge.update({
        where: {
            id: knowledgeData === null || knowledgeData === void 0 ? void 0 : knowledgeData.id,
        },
        data: {
            adminId: verificatorId,
            verify: true,
        },
        select: {
            classes: true,
            student: true,
        },
    });
});
exports.verifyStudent = verifyStudent;
const unVerifyStudent = (id, studentId, classId, date) => {
    return prisma_1.default.student_knowledge.update({
        where: {
            id,
            AND: {
                studentId,
                classId,
                date: {
                    equals: new Date(date),
                },
            },
        },
        data: {
            adminId: null,
            verify: false,
            verifiedDate: null,
        },
    });
};
exports.unVerifyStudent = unVerifyStudent;
const deleteStudentRegistration = (id) => {
    return prisma_1.default.student_knowledge.delete({
        where: {
            id,
        },
    });
};
exports.deleteStudentRegistration = deleteStudentRegistration;
//# sourceMappingURL=admin.service.js.map