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
exports.updateEvent = exports.checkEventsScheduledForDay = exports.deleteEvent = exports.getEvents = exports.checkIfEventWithClassExistForDateAlready = exports.createEvent = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const createEvent = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_1.default.events.create({ data });
    }
    catch (error) {
        throw error;
    }
});
exports.createEvent = createEvent;
const checkIfEventWithClassExistForDateAlready = (classId, date, start_time, end_time) => __awaiter(void 0, void 0, void 0, function* () {
    const existingEvent = yield prisma_1.default.events.findFirst({
        where: {
            classId,
            event_date: {
                equals: new Date(date),
            },
            start_time: {
                equals: new Date(start_time),
            },
            end_time: {
                equals: new Date(end_time),
            },
        },
    });
    return !!existingEvent;
});
exports.checkIfEventWithClassExistForDateAlready = checkIfEventWithClassExistForDateAlready;
const getEvents = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_1.default.events.findMany({
            include: {
                class: true,
            },
        });
    }
    catch (error) {
        throw error;
    }
});
exports.getEvents = getEvents;
const deleteEvent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_1.default.events.delete({ where: { id } });
    }
    catch (error) {
        throw error;
    }
});
exports.deleteEvent = deleteEvent;
const checkEventsScheduledForDay = (start_time, date) => __awaiter(void 0, void 0, void 0, function* () {
    const existingEvent = yield prisma_1.default.events.findFirst({
        where: {
            event_date: {
                equals: new Date(date),
            },
            start_time: {
                equals: new Date(start_time),
            },
        },
    });
    return !!existingEvent;
});
exports.checkEventsScheduledForDay = checkEventsScheduledForDay;
const updateEvent = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_1.default.events.update({ where: { id }, data });
    }
    catch (error) {
        throw error;
    }
});
exports.updateEvent = updateEvent;
//# sourceMappingURL=events.service.js.map