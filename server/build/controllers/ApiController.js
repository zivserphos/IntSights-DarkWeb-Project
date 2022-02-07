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
const scraper_1 = __importDefault(require("../services/scraper"));
const helpers_1 = __importDefault(require("../utils/helpers"));
const sse_1 = __importDefault(require("../services/sse"));
const config_1 = __importDefault(require("../utils/config"));
// console.log(config.SEND_INTERVAL);
const sse = (req, res, next) => {
    if (req.headers.accept === "text/event-stream") {
        sendEvent(res);
    }
    else {
        next({ status: 400, message: { error: "Invalid headers" } });
    }
};
const sendEvent = (res) => {
    res.writeHead(200, {
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "Content-Type": "aplication/json",
    });
    const sseId = new Date().toDateString();
    setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
        const data = JSON.stringify(yield (0, scraper_1.default)(helpers_1.default));
        console.log(data);
        let i = 0;
        if (i === 0) {
            i += 1;
            (0, sse_1.default)(res, sseId, JSON.stringify(yield (0, scraper_1.default)(helpers_1.default)));
        }
    }), config_1.default.SEND_INTERVAL);
};
exports.default = sse;
