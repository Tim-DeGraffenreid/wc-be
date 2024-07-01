"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFromClassSchema = exports.unVerifyStudentSchema = exports.verifyStudentSchema = exports.forgotPasswordSchema = exports.adminSchema = void 0;
const zod_1 = require("zod");
exports.adminSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: (0, zod_1.string)({ required_error: 'email is required' }).email('Must be an email'),
        password: (0, zod_1.string)({ required_error: 'password is required' }).min(8),
        name: (0, zod_1.string)({ required_error: 'name is required' }),
        phoneNumber: (0, zod_1.string)(),
    }),
});
exports.forgotPasswordSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({ required_error: 'name is required' }),
        phoneNumber: (0, zod_1.string)(),
        password: (0, zod_1.string)({ required_error: 'password is required' }).min(8),
    }),
});
exports.verifyStudentSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        studentId: (0, zod_1.string)({ required_error: 'studentId is required' }),
        classId: (0, zod_1.string)({ required_error: 'classId is required' }),
        date: (0, zod_1.string)({ required_error: 'date is required' }).datetime(),
    }),
});
exports.unVerifyStudentSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        studentId: (0, zod_1.string)({ required_error: 'studentId is required' }),
        classId: (0, zod_1.string)({ required_error: 'classId is required' }),
        date: (0, zod_1.string)({ required_error: 'date is required' }).datetime(),
    }),
    params: (0, zod_1.object)({
        id: (0, zod_1.string)({ required_error: 'id is required' }),
    }),
});
exports.deleteFromClassSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        id: (0, zod_1.string)({ required_error: 'classId is required' }),
    }),
});
//# sourceMappingURL=admin.schema.js.map