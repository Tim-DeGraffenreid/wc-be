"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
require("dotenv/config");
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const node_cron_1 = __importDefault(require("node-cron"));
const parents_route_1 = __importDefault(require("./routes/parents.route"));
const students_route_1 = __importDefault(require("./routes/students.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const admin_route_1 = __importDefault(require("./routes/admin.route"));
const class_route_1 = __importDefault(require("./routes/class.route"));
const events_route_1 = __importDefault(require("./routes/events.route"));
const appError_1 = __importDefault(require("./utils/appError"));
const connectRedis_1 = __importStar(require("./utils/connectRedis"));
const salesforce_service_1 = require("./services/salesforce.service");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
(0, connectRedis_1.connectRedis)()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    app.use((0, cors_1.default)());
    app.use((0, express_1.json)());
    app.use((0, express_1.urlencoded)({ extended: false }));
    app.use((0, cookie_parser_1.default)());
    // routes
    app.use('/api/auth', auth_route_1.default);
    app.use('/api/class', class_route_1.default);
    app.use('/api/parents', parents_route_1.default);
    app.use('/api/students', students_route_1.default);
    app.use('/api/admin', admin_route_1.default);
    app.use('/api/events', events_route_1.default);
    // CronJobs
    // CronJobs
    node_cron_1.default.schedule('*/1 * * * *', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, salesforce_service_1.syncDatabaseAndSalesforce)();
        }
        catch (error) {
            console.error('Error during scheduled synchronization:', error);
        }
    }));
    node_cron_1.default.schedule('*/1 * * * *', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, salesforce_service_1.handleParentToChildren)();
        }
        catch (error) {
            console.error('Error during scheduled relationship update:', error);
        }
    }));
    node_cron_1.default.schedule('*/2 * * * *', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, salesforce_service_1.deleteFromDatabase)();
        }
        catch (error) {
            console.error('Error during schedule database deletion:', error);
        }
    }));
    // Health checker: to check if server is successfully running
    app.get('/api/healthChecker', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const message = yield connectRedis_1.default.get('try');
        res.status(200).json({
            status: 'success',
            message,
        });
    }));
    // Route not found handler
    app.all('*', (req, _res, next) => {
        next(new appError_1.default(404, `Route ${req.originalUrl} not found`));
    });
    // Error handler across app
    app.use((error, _req, res, _next) => {
        error.status = error.status || 'error';
        error.statusCode = error.statusCode || 500;
        res.status(error.statusCode).json({
            status: error.status,
            message: error.message,
        });
    });
    /*
        app.listen(port, () => {
          console.log(`⚡[server]: Server started successfully on PORT: ${port}`)
        })
    */
}))
    .catch((err) => console.log(err));
exports.default = app;
//# sourceMappingURL=index.js.map