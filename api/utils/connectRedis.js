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
exports.connectRedis = void 0;
const redis_1 = require("redis");
const redisClient = (0, redis_1.createClient)({
    password: 'VrMDd6Xwxu4kpNQDwYudS9TeofGdfI8D',
    socket: {
        host: 'redis-14837.c302.asia-northeast1-1.gce.cloud.redislabs.com',
        port: 14837,
    },
});
const connectRedis = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield redisClient.connect();
        console.log('⚡[redis]: Redis client connected successfully');
        redisClient.set('try', 'Hello Welcome to Wecode');
    }
    catch (error) {
        console.log(error);
        setTimeout(exports.connectRedis, 5000);
    }
});
exports.connectRedis = connectRedis;
exports.default = redisClient;
//# sourceMappingURL=connectRedis.js.map