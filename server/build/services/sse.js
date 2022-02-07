"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const writeEvent = (res, sseId, data) => {
    res.write(`id: ${sseId}\n`);
    res.write(`data: ${data}\n\n`);
};
exports.default = writeEvent;
