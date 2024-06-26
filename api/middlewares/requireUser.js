"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfAdmin = exports.requireUser = void 0;
const appError_1 = __importDefault(require("../utils/appError"));
const prisma_1 = __importDefault(require("../utils/prisma"));
const requireUser = (req, res, next) => {
    try {
        const user = res.locals.user;
        if (!user) {
            return next(new appError_1.default(400, `Session has expired or user doesn't exist`));
        }
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.requireUser = requireUser;
const checkIfAdmin = (req, res, next) => {
    try {
        const user = res.locals.user;
        if (!user) {
            return next(new appError_1.default(400, `Session has expired or user doesn't exist`));
        }
        const admin = prisma_1.default.admin.findFirst({ where: { id: user.id } });
        if (!admin) {
            return next(new appError_1.default(400, `You are not authorized to perform this action`));
        }
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.checkIfAdmin = checkIfAdmin;
//# sourceMappingURL=requireUser.js.map