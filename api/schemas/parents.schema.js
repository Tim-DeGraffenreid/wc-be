"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromClassSchema = exports.addToClassSchema = exports.deleteParentSchema = exports.updateParentSchema = exports.getParentSchema = exports.demographicInfoSchema = exports.parentSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const student_schema_1 = require("./student.schema");
exports.parentSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: (0, zod_1.string)({ required_error: 'email is required' }).email('Must be an email'),
        password: (0, zod_1.string)({ required_error: 'password is required' }).min(8),
        fName: (0, zod_1.string)({ required_error: 'fName is required' }),
        lName: (0, zod_1.string)({ required_error: 'lName is required' }),
        phoneNumber: (0, zod_1.string)(),
        birthday: (0, zod_1.string)({
            required_error: 'birthday is required',
        }).regex(/^\d{4}-\d{2}-\d{2}$/),
        educationLevel: (0, zod_1.nativeEnum)(client_1.educationLevel),
        veteranStatus: (0, zod_1.nativeEnum)(client_1.veteranStatus),
        regularTransportation: (0, zod_1.boolean)({
            required_error: 'regularTransportation is required',
        }),
        housingStatus: (0, zod_1.nativeEnum)(client_1.housingStatus),
        children: (0, zod_1.optional)((0, zod_1.array)(student_schema_1.studentSchema)),
    }),
});
exports.demographicInfoSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        parent: exports.parentSchema,
        zipCode: (0, zod_1.string)().regex(/^\d{5}$/),
        address: (0, zod_1.string)(),
        foodStampEligible: (0, zod_1.boolean)(),
        ethnicity: (0, zod_1.string)(),
        householdIncome: (0, zod_1.string)(),
        disclaimerAccepted: (0, zod_1.boolean)(),
    }),
});
const params = {
    params: (0, zod_1.object)({
        id: (0, zod_1.string)(),
    }),
};
exports.getParentSchema = (0, zod_1.object)(Object.assign({}, params));
exports.updateParentSchema = (0, zod_1.object)(Object.assign(Object.assign({}, params), { body: (0, zod_1.object)({
        email: (0, zod_1.string)({ required_error: 'email is required' }).email('Must be an email'),
        password: (0, zod_1.string)({ required_error: 'password is required' }).min(8),
        fName: (0, zod_1.string)({ required_error: 'fName is required' }),
        lName: (0, zod_1.string)({ required_error: 'lName is required' }),
        phoneNumber: (0, zod_1.string)(),
        birthday: (0, zod_1.string)({
            required_error: 'birthday is required',
        }).regex(/^\d{4}-\d{2}-\d{2}$/),
        educationLevel: (0, zod_1.nativeEnum)(client_1.educationLevel),
        veteranStatus: (0, zod_1.nativeEnum)(client_1.veteranStatus),
        regularTransportation: (0, zod_1.boolean)({
            required_error: 'regularTransportation is required',
        }),
        housingStatus: (0, zod_1.nativeEnum)(client_1.housingStatus),
        children: (0, zod_1.optional)((0, zod_1.array)(student_schema_1.studentSchema)),
        demographicInfo: (0, zod_1.optional)(exports.demographicInfoSchema),
    }).partial() }));
exports.deleteParentSchema = (0, zod_1.object)(Object.assign({}, params));
exports.addToClassSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        studentId: (0, zod_1.string)(),
        classId: (0, zod_1.string)(),
    }),
    body: (0, zod_1.object)({
        date: (0, zod_1.string)({ required_error: 'date is required' }).datetime(),
    }),
});
exports.removeFromClassSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        studentId: (0, zod_1.string)({ required_error: 'studentId is required' }),
        id: (0, zod_1.string)({ required_error: 'id is required' }),
    }),
});
//# sourceMappingURL=parents.schema.js.map