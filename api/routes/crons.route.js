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
const express_1 = __importDefault(require("express"));
const salesforce_service_1 = require("../services/salesforce.service");
const router = express_1.default.Router();
router.route('/synchronize').get((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // await syncDatabaseAndSalesforce()
        console.log("Syncronize");
        res.status(201).json({
            status: 'success',
            message: 'syncDatabaseAndSalesforce successfully executed',
        });
    }
    catch (error) {
        console.error('syncDatabaseAndSalesforce error during scheduled synchronization:', error);
        next(error);
    }
}));
router.route("/relationships").get((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, salesforce_service_1.handleParentToChildren)();
        res.status(201).json({
            "status": "success",
            "message": "handleParentToChildren successfully executed",
        });
    }
    catch (error) {
        console.error("handleParentToChildren error during scheduled synchronization:", error);
        next(error);
    }
}));
router.route("/delete-orphans").get((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, salesforce_service_1.deleteFromDatabase)();
        res.status(201).json({
            "status": "success",
            "message": "deleteFromDatabase successfully executed",
        });
    }
    catch (error) {
        console.error("deleteFromDatabase error during scheduled synchronizatoin:", error);
        next(error);
    }
}));
exports.default = router;
//# sourceMappingURL=crons.route.js.map