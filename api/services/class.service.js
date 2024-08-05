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
exports.deleteClass = exports.updateClass = exports.findClassByName = exports.findClassById = exports.addClass = exports.getClasses = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const getClasses = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.classes.findMany({
        where: {
            id: {
                not: '5548805a-69e4-481c-8463-bb49bea1c330',
            },
        },
    });
});
exports.getClasses = getClasses;
const addClass = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.classes.create({ data });
});
exports.addClass = addClass;
const findClassById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.classes.findUniqueOrThrow({ where: { id } });
});
exports.findClassById = findClassById;
const findClassByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.classes.findUnique({ where: { name } });
});
exports.findClassByName = findClassByName;
const updateClass = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.classes.update({ where: { id }, data });
});
exports.updateClass = updateClass;
const deleteClass = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.classes.delete({ where: { id } });
});
exports.deleteClass = deleteClass;
//# sourceMappingURL=class.service.js.map