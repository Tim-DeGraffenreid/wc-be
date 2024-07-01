"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClassSchema = exports.updateClassSchema = exports.getClassSchema = exports.classSchema = void 0;
const zod_1 = require("zod");
exports.classSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({ required_error: "Class name is required" }),
    }),
});
const params = {
    params: (0, zod_1.object)({
        id: (0, zod_1.string)(),
    }),
};
exports.getClassSchema = (0, zod_1.object)(Object.assign({}, params));
exports.updateClassSchema = (0, zod_1.object)(Object.assign(Object.assign({}, params), { body: (0, zod_1.object)({
        name: (0, zod_1.string)({ required_error: "Class name is required" }),
    }) }));
exports.deleteClassSchema = (0, zod_1.object)(Object.assign({}, params));
//# sourceMappingURL=class.schema.js.map