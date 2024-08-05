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
exports.deleteClassHandler = exports.updateClassHandler = exports.getClassByIdHandler = exports.addClassHandler = exports.getClassesHandler = void 0;
const class_service_1 = require("../services/class.service");
const appError_1 = __importDefault(require("../utils/appError"));
const getClassesHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const classes = yield (0, class_service_1.getClasses)();
        res.status(200).json({
            status: 'success',
            classes,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getClassesHandler = getClassesHandler;
const addClassHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newClass = yield (0, class_service_1.addClass)(req.body);
        res.status(201).json({
            status: 'success',
            data: newClass,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.addClassHandler = addClassHandler;
const getClassByIdHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const clss = yield (0, class_service_1.findClassById)(id);
        if (!clss) {
            return next(new appError_1.default(404, 'Class with id does not exist'));
        }
        res.status(200).json({
            status: 'success',
            data: clss,
        });
    }
    catch (error) { }
});
exports.getClassByIdHandler = getClassByIdHandler;
const updateClassHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const clss = yield (0, class_service_1.findClassById)(id);
        if (!clss) {
            return next(new appError_1.default(404, 'Class with id does not exist'));
        }
        const updatedClass = yield (0, class_service_1.updateClass)(id, clss);
        Object.assign(clss, req.body);
        res.status(200).json({
            status: 'success',
            data: {
                post: updatedClass,
            },
        });
    }
    catch (error) { }
});
exports.updateClassHandler = updateClassHandler;
const deleteClassHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const clss = yield (0, class_service_1.findClassById)(id);
        console.log(id);
        if (!clss) {
            return next(new appError_1.default(404, 'Class with id does not exist'));
        }
        yield (0, class_service_1.deleteClass)(id);
        res.status(204).json({
            status: 'success',
            data: null,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteClassHandler = deleteClassHandler;
//# sourceMappingURL=class.controller.js.map