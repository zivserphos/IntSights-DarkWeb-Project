"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    MONGO_URI: process.env.MONGO_URI || "undefined",
    PORT: process.env.PORT,
    SEND_INTERVAL: Number(process.env.SEND_INTERVAL) || 2000 * 60,
    MONGO_DOCKER: process.env.MONGO_DOCKER,
};
exports.default = config;
