"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmailSchema = exports.sendConfirmationEmailSchema = exports.forgotPasswordSchema = exports.loginAdminSchema = exports.loginUserSchema = void 0;
const zod_1 = require("zod");
var UserType;
(function (UserType) {
    UserType["PARENT"] = "parent";
    UserType["STUDENT"] = "student";
})(UserType || (UserType = {}));
exports.loginUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: (0, zod_1.string)({
            required_error: 'Email address is required',
        }).email('Invalid email address'),
        password: (0, zod_1.string)({
            required_error: 'Password is required',
        }),
        userType: (0, zod_1.nativeEnum)(UserType),
    }),
});
exports.loginAdminSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: (0, zod_1.string)({
            required_error: 'Email address is required',
        }).email('Invalid email address'),
        password: (0, zod_1.string)({
            required_error: 'Password is required',
        }),
    }),
});
exports.forgotPasswordSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        fName: (0, zod_1.string)().optional(),
        lName: (0, zod_1.string)().optional(),
        phoneNumber: (0, zod_1.string)({ required_error: 'phoneNumber is required' })
            .regex(/^\d{10}$/)
            .optional(),
        password: (0, zod_1.string)(),
        userType: (0, zod_1.string)(),
        email: (0, zod_1.string)().email().optional(),
    }),
});
exports.sendConfirmationEmailSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: (0, zod_1.string)({
            required_error: 'Email address is required',
        }).email('Invalid email address'),
        userType: (0, zod_1.nativeEnum)(UserType),
    }),
});
exports.verifyEmailSchema = (0, zod_1.object)({
    query: (0, zod_1.object)({
        token: (0, zod_1.string)({
            required_error: 'Token is required',
        }),
    }),
});
//# sourceMappingURL=auth.schema.js.map