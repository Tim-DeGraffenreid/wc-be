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
exports.generateVerifyEmailToken = exports.signTokens = void 0;
const connectRedis_1 = __importDefault(require("../utils/connectRedis"));
const jwt_1 = require("../utils/jwt");
const signTokens = (user) => __awaiter(void 0, void 0, void 0, function* () {
    connectRedis_1.default.set(user.id, JSON.stringify(user), {
        EX: Number(process.env.REDIS_CACHE_EXPIRES_IN) * 60,
    });
    const access_token = (0, jwt_1.signJwt)({ sub: user.id }, {
        expiresIn: `${process.env.ACCESS_TOKEN_EXPIRES_IN}d`,
    });
    return { access_token };
});
exports.signTokens = signTokens;
const generateVerifyEmailToken = ({ email, userType, }) => __awaiter(void 0, void 0, void 0, function* () {
    connectRedis_1.default.set(email, JSON.stringify({ email, userType }), {
        EX: 24 * 60 * 60,
    });
    const token = (0, jwt_1.signJwt)({ sub: email }, {
        expiresIn: `2d`,
    });
    return { token };
});
exports.generateVerifyEmailToken = generateVerifyEmailToken;
//# sourceMappingURL=auth.service.js.map