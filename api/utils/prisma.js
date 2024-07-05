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
const edge_1 = require("@prisma/client/edge");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new edge_1.PrismaClient();
const createSuperAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const superAdmin = yield prisma.admin.findUnique({
            where: { email: 'adrienne.story@wecodekc.org' },
        });
        if (!superAdmin) {
            const password = yield bcrypt_1.default.hash('testing', 10);
            yield prisma.admin.create({
                data: {
                    email: 'adrienne.story@wecodekc.org',
                    name: 'Adrienne Story',
                    isAdmin: true,
                    password,
                },
            });
            console.log('Super admin created');
        }
        else {
            console.log('Super admin already exists');
        }
    }
    catch (error) {
        console.log('Error creating super admin', error);
    }
});
prisma
    .$connect()
    .then(() => {
    console.log('Connected to database');
    createSuperAdmin();
})
    .catch((error) => {
    console.log('Error connecting to database', error);
});
exports.default = prisma;
//# sourceMappingURL=prisma.js.map