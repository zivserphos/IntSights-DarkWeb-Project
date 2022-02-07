"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../utils/config"));
const mongo = mongoose_1.default
    .connect(config_1.default.MONGO_DOCKER, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
    console.log("Connected to mongo successfully");
})
    .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
});
exports.default = mongo;
