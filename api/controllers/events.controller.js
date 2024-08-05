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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEventHandler = exports.deleteEventHandler = exports.getEventsHandler = exports.createEventhandler = void 0;
const class_service_1 = require("../services/class.service");
const events_service_1 = require("../services/events.service");
const createEventhandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { start_time, event_date, end_time } = req.body;
        const { classId } = req.params;
        yield (0, class_service_1.findClassById)(classId);
        const checkEvent = yield (0, events_service_1.checkIfEventWithClassExistForDateAlready)(classId, event_date, start_time, end_time);
        console.log({ checkEvent });
        if (checkEvent) {
            return res
                .status(400)
                .json({ error: 'Event already scheduled for that date and time' });
        }
        const event = yield (0, events_service_1.createEvent)(Object.assign(Object.assign({}, req.body), { class: { connect: { id: classId } } }));
        res.status(201).json({
            status: 'success',
            event,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createEventhandler = createEventhandler;
const getEventsHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield (0, events_service_1.getEvents)();
        res.status(200).json({
            status: 'success',
            events,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getEventsHandler = getEventsHandler;
const deleteEventHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const event = yield (0, events_service_1.deleteEvent)(id);
        res.status(204).json({
            status: 'success',
            data: event,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteEventHandler = deleteEventHandler;
const updateEventHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const event = yield (0, events_service_1.updateEvent)(id, req.body);
        res.status(200).json({
            status: 'success',
            data: event,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateEventHandler = updateEventHandler;
//# sourceMappingURL=events.controller.js.map