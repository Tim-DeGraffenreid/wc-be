"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = exports.signJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signJwt = (payload, options) => {
    const privateKey = process.env.JWT_TOKEN;
    if (privateKey) {
        return jsonwebtoken_1.default.sign(payload, privateKey, Object.assign({}, (options && options)));
    }
};
exports.signJwt = signJwt;
const verifyJwt = (token) => {
    try {
        const publicKey = process.env.JWT_TOKEN;
        if (publicKey) {
            const decoded = jsonwebtoken_1.default.verify(token, publicKey);
            return decoded;
        }
    }
    catch (error) {
        return null;
    }
};
exports.verifyJwt = verifyJwt;
//# sourceMappingURL=jwt.js.map