"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEventSchema = exports.createEventSchema = void 0;
const zod_1 = require("zod");
exports.createEventSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        classId: (0, zod_1.string)({
            required_error: 'Class id is required',
        }),
    }),
    body: (0, zod_1.object)({
        start_time: (0, zod_1.string)({
            required_error: 'Start time is required',
        }).datetime(),
        end_time: (0, zod_1.string)({
            required_error: 'End time is required',
        }).datetime(),
        event_date: (0, zod_1.string)({
            required_error: 'Event date is required',
        }).datetime(),
        location: (0, zod_1.string)({
            required_error: 'Location is required',
        }),
        instructor: (0, zod_1.string)({
            required_error: 'Instructor is required',
        }),
    }),
});
exports.updateEventSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        id: (0, zod_1.string)({
            required_error: 'Event id is required',
        }),
    }),
    body: (0, zod_1.object)({
        start_time: (0, zod_1.string)().datetime(),
        end_time: (0, zod_1.string)().datetime(),
        event_date: (0, zod_1.string)().datetime(),
        location: (0, zod_1.string)(),
        instructor: (0, zod_1.string)(),
    }).partial(),
});
//# sourceMappingURL=events.schema.js.map