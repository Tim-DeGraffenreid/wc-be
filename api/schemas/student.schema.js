"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromClassSchema = exports.addToClassSchema = exports.deleteStudentSchema = exports.updateStudentSchema = exports.getStudentSchema = exports.knowledgeSchema = exports.studentSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
exports.studentSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: (0, zod_1.string)({ required_error: 'email is required' }).email(),
        password: (0, zod_1.string)({ required_error: 'password is required' }).min(8),
        fName: (0, zod_1.string)({ required_error: 'fName is required' }),
        lName: (0, zod_1.string)({ required_error: 'lName is required' }),
        phoneNumber: (0, zod_1.string)(),
        birthday: (0, zod_1.string)({
            required_error: 'birthday is required',
        }).regex(/^\d{4}-\d{2}-\d{2}$/),
        grade: (0, zod_1.nativeEnum)(client_1.grades),
        schoolName: (0, zod_1.string)({ required_error: 'schoolName is required' }),
        gender: (0, zod_1.nativeEnum)(client_1.student_gender_enum),
        zipCode: (0, zod_1.string)({ required_error: 'zipCode is required' }).regex(/^\d{5}$/),
        emergencyContact: (0, zod_1.string)().optional(),
    }),
});
exports.knowledgeSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        student: exports.studentSchema,
        grade: (0, zod_1.string)(),
        class: (0, zod_1.string)(),
        skills: (0, zod_1.string)(),
    }),
});
const params = {
    params: (0, zod_1.object)({
        id: (0, zod_1.string)(),
    }),
};
exports.getStudentSchema = (0, zod_1.object)(Object.assign({}, params));
exports.updateStudentSchema = (0, zod_1.object)(Object.assign(Object.assign({}, params), { body: (0, zod_1.object)({
        email: (0, zod_1.string)({ required_error: 'email is required' }).email(),
        password: (0, zod_1.string)({ required_error: 'password is required' }).min(8),
        fName: (0, zod_1.string)({ required_error: 'fName is required' }),
        lName: (0, zod_1.string)({ required_error: 'lName is required' }),
        phoneNumber: (0, zod_1.string)(),
        birthday: (0, zod_1.string)({
            required_error: 'birthday is required',
        }).datetime(),
        grade: (0, zod_1.nativeEnum)(client_1.grades),
        schoolName: (0, zod_1.string)({ required_error: 'schoolName is required' }),
        gender: (0, zod_1.nativeEnum)(client_1.student_gender_enum),
        zipCode: (0, zod_1.string)({ required_error: 'zipCode is required' }).regex(/^\d{5}$/),
        emergencyContact: (0, zod_1.string)().optional(),
    }).partial() }));
exports.deleteStudentSchema = (0, zod_1.object)(Object.assign({}, params));
exports.addToClassSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        classId: (0, zod_1.string)(),
    }),
    body: (0, zod_1.object)({
        date: (0, zod_1.string)({ required_error: 'date is required' }).datetime(),
    }),
});
exports.removeFromClassSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        id: (0, zod_1.string)(),
    }),
});
//# sourceMappingURL=student.schema.js.map