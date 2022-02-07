"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// eslint-disable-next-line import/no-extraneous-dependencies
const bodyParser = __importStar(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const morgan_2 = __importDefault(require("./middlewares/morgan"));
const errorHandlers_1 = __importDefault(require("./middlewares/errorHandlers"));
const helpers_1 = __importDefault(require("./utils/helpers"));
const ApiRouter_1 = __importDefault(require("./routes/ApiRouter"));
console.log(helpers_1.default);
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(bodyParser.text());
app.use(morgan_2.default, (0, morgan_1.default)(":method :url :status :res[content-length] - :response-time ms :body"));
app.get("/", (_req, res) => {
    res.send("hello world");
});
app.use("/dashboard", ApiRouter_1.default);
app.use(errorHandlers_1.default);
exports.default = app;
