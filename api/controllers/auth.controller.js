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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmailHandler = exports.sendConfirmationEmailHandler = exports.forgotPasswordHandler = exports.getMeHandler = exports.adminLogin = exports.login = exports.registerStudent = exports.registerParent = void 0;
const auth_service_1 = require("../services/auth.service");
const mail_service_1 = require("../services/mail.service");
const parents_service_1 = require("../services/parents.service");
const salesforce_service_1 = require("../services/salesforce.service");
const students_service_1 = require("../services/students.service");
const appError_1 = __importDefault(require("../utils/appError"));
const connectRedis_1 = __importDefault(require("../utils/connectRedis"));
const jwt_1 = require("../utils/jwt");
const password_manager_1 = require("../utils/password.manager");
const prisma_1 = __importDefault(require("../utils/prisma"));
const accessTokenExpiresInMinutes = Number(process.env.ACCESS_TOKEN_EXPIRES_IN);
// if (isNaN(accessTokenExpiresInMinutes)) {
//   throw new Error('Invalid ACCESS_TOKEN_EXPIRES_IN value')
// }
const cookiesOptions = {
    httpOnly: true,
    sameSite: 'lax',
};
if (process.env.NODE_ENV === 'production')
    cookiesOptions.secure = true;
const accessTokenCookieOptions = Object.assign(Object.assign({}, cookiesOptions), { expires: new Date(Date.now() + accessTokenExpiresInMinutes * 60 * 1000), maxAge: accessTokenExpiresInMinutes * 60 * 1000 });
// export const registerParent = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const salesforceResponse = await addParentToSalesforce(req.body)
//     if (typeof salesforceResponse === 'object' && 'id' in salesforceResponse) {
//       const parent = await createParent({
//         ...req.body,
//         salesforceId: salesforceResponse.id as string,
//       })
//       const { access_token } = await signTokens(parent)
//       res.cookie('access_token', access_token, accessTokenCookieOptions)
//       res.cookie('user_type', 'parent', {
//         ...accessTokenCookieOptions,
//         httpOnly: false,
//       })
//       res.cookie('logged_in', true, {
//         ...accessTokenCookieOptions,
//         httpOnly: false,
//       })
//       res.status(201).json({
//         status: 'success',
//         access_token,
//         data: {
//           parent,
//         },
//       })
//     }
//   } catch (error: any) {
//     console.error('Unexpected Error:', error)
//     res.status(500).json({
//       status: 'error',
//       message: 'An unexpected error occurred.',
//     })
//   }
// }
const registerParent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parentRes = yield (0, parents_service_1.createParent)(Object.assign({}, req.body));
        if (parentRes === null || parentRes === void 0 ? void 0 : parentRes.success) {
            const salesforceResponse = yield (0, salesforce_service_1.addParentToSalesforce)(req.body);
            if (typeof salesforceResponse === 'object' &&
                'id' in salesforceResponse &&
                (parentRes === null || parentRes === void 0 ? void 0 : parentRes.data)) {
                (0, parents_service_1.updateParent)(parentRes === null || parentRes === void 0 ? void 0 : parentRes.data, { salesforceId: salesforceResponse.id });
            }
            const { access_token } = yield (0, auth_service_1.signTokens)(parentRes.data);
            if (!access_token) {
                console.error('Error signing tokens');
                return res.status(500).json({
                    status: 'error',
                    message: 'An unexpected error occurred while signing tokens.',
                });
            }
            // Set cookies and respond with success
            res.cookie('access_token', access_token, accessTokenCookieOptions);
            res.cookie('user_type', 'parent', Object.assign(Object.assign({}, accessTokenCookieOptions), { httpOnly: false }));
            res.cookie('logged_in', true, Object.assign(Object.assign({}, accessTokenCookieOptions), { httpOnly: false }));
            return res.status(201).json({
                status: 'success',
                access_token,
                data: Object.assign({}, parentRes.data),
            });
        }
        else {
            return res.status(500).json({
                status: 'error',
                message: parentRes === null || parentRes === void 0 ? void 0 : parentRes.message,
            });
        }
    }
    catch (error) {
        console.error('Unexpected Error:', error);
        return res.status(500).json({
            status: 'error',
            message: error ? error : 'An unexpected error occurred.',
        });
    }
});
exports.registerParent = registerParent;
const registerStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentRes = yield (0, students_service_1.createStudent)(Object.assign({}, req.body));
        if (studentRes === null || studentRes === void 0 ? void 0 : studentRes.success) {
            const salesforce = yield (0, salesforce_service_1.addStudentToSalesforce)(req.body);
            if (typeof salesforce === 'object' && 'id' in salesforce && (studentRes === null || studentRes === void 0 ? void 0 : studentRes.data)) {
                yield (0, students_service_1.updateStudent)(studentRes === null || studentRes === void 0 ? void 0 : studentRes.data, { salesforceId: salesforce === null || salesforce === void 0 ? void 0 : salesforce.id });
                const { access_token } = yield (0, auth_service_1.signTokens)(studentRes.data);
                res.cookie('access_token', access_token, accessTokenCookieOptions);
                res.cookie('user_type', 'student', Object.assign(Object.assign({}, accessTokenCookieOptions), { httpOnly: false }));
                res.cookie('logged_in', true, Object.assign(Object.assign({}, accessTokenCookieOptions), { httpOnly: false }));
                res.status(201).json({
                    status: 'success',
                    access_token,
                    data: Object.assign({}, studentRes.data),
                });
            }
        }
        else {
            return res.status(500).json({
                status: 'error',
                message: studentRes === null || studentRes === void 0 ? void 0 : studentRes.message,
            });
        }
    }
    catch (error) {
        console.error('Unexpected Error:', error);
        res.status(500).json({
            status: 'error',
            message: error ? error : 'An unexpected error occurred.',
        });
    }
});
exports.registerStudent = registerStudent;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, userType } = req.body;
        let user;
        if (userType === 'parent') {
            user = yield prisma_1.default.parent.findFirst({
                where: { email },
            });
        }
        else {
            user = yield prisma_1.default.student.findFirst({
                where: { email },
            });
        }
        if (!user || !(yield (0, password_manager_1.comparePasswords)(password, user.password))) {
            return next(new appError_1.default(400, 'Invalid email or password'));
        }
        const { access_token } = yield (0, auth_service_1.signTokens)(user);
        res.cookie('access_token', access_token, accessTokenCookieOptions);
        res.cookie('user_type', userType, Object.assign(Object.assign({}, accessTokenCookieOptions), { httpOnly: false }));
        res.cookie('logged_in', true, Object.assign(Object.assign({}, accessTokenCookieOptions), { httpOnly: false }));
        // 4. Send response
        res.status(200).json({
            status: 'success',
            access_token,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
const adminLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield prisma_1.default.admin.findFirst({
            where: { email },
        });
        if (!user || !(yield (0, password_manager_1.comparePasswords)(password, user.password))) {
            return next(new appError_1.default(400, 'Invalid email or password'));
        }
        const { access_token } = yield (0, auth_service_1.signTokens)(user);
        res.cookie('access_token', access_token, accessTokenCookieOptions);
        res.cookie('user_type', 'admin', Object.assign(Object.assign({}, accessTokenCookieOptions), { httpOnly: false }));
        res.cookie('logged_in', true, Object.assign(Object.assign({}, accessTokenCookieOptions), { httpOnly: false }));
        res.status(200).json({
            status: 'success',
            access_token,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.adminLogin = adminLogin;
const getMeHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = res.locals.user, { userType } = _a, rest = __rest(_a, ["userType"]);
        res.status(200).json({
            status: 'success',
            data: Object.assign({}, rest),
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getMeHandler = getMeHandler;
const forgotPasswordHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _b = req.body, { userType, email } = _b, rest = __rest(_b, ["userType", "email"]);
        let results;
        if (userType === 'student') {
            results = yield (0, students_service_1.findStudentByDetails)(rest);
        }
        else if (userType === 'parent') {
            results = yield (0, parents_service_1.changeParentPassword)(email, rest === null || rest === void 0 ? void 0 : rest.password);
        }
        if (!results) {
            return next(new appError_1.default(400, 'Details not found'));
        }
        res.status(201).json({
            status: 'success',
            results,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.forgotPasswordHandler = forgotPasswordHandler;
const sendConfirmationEmailHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, userType } = req.body;
        // const session = await redisClient.get(email)
        // if (session) {
        //   return next(new AppError(400, 'Email already sent'))
        // }
        let results = (yield (0, parents_service_1.findParentByEmail)({ email })) || (yield (0, students_service_1.findStudentByEmail)({ email }));
        if (results) {
            return next(new appError_1.default(400, 'Email already exists'));
        }
        const { token } = yield (0, auth_service_1.generateVerifyEmailToken)({ email, userType });
        yield (0, mail_service_1.sendConfirmationEmail)(email, token);
        res.status(201).json({
            status: 'success',
            message: 'Email sent',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.sendConfirmationEmailHandler = sendConfirmationEmailHandler;
const verifyEmailHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.body;
        const decoded = (0, jwt_1.verifyJwt)(token);
        if (!decoded) {
            return next(new appError_1.default(400, 'Invalid token'));
        }
        const session = yield connectRedis_1.default.get(decoded.sub);
        if (!session) {
            return next(new appError_1.default(401, `Invalid token or token has expired`));
        }
        res.status(200).json({
            status: 'success',
            email: JSON.parse(session).email,
            userType: JSON.parse(session).userType,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.verifyEmailHandler = verifyEmailHandler;
//# sourceMappingURL=auth.controller.js.map