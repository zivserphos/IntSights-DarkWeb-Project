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
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
const socks_proxy_agent_1 = require("socks-proxy-agent");
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const Paste_1 = __importDefault(require("../db/models/Paste"));
const proxy = "socks://localHost:9050";
const agent = new socks_proxy_agent_1.SocksProxyAgent(proxy);
const genAuthorAndDate = ($, elem) => {
    // Load the HTML string into cheerio
    const details = $(elem)
        .find("div")
        .first()
        .text()
        .split("Posted by")[1] // gives you string like that {Author} at {Date}
        .split("at"); // split into title[0] and date[1]
    const date = new Date(details[1]); // date
    const author = details[0]; // title
    return { date, author };
};
const genTitle = ($, elem) => $(elem).text();
const genContent = ($, elem) => $(elem).text();
const scraper = (html) => {
    const $ = cheerio_1.default.load(html); // Load the HTML string into cheerio
    const contentList = [];
    const titleList = [];
    const authorAndDateList = [];
    $(".pre-footer > div").each((_, elem) => {
        authorAndDateList.push(genAuthorAndDate($, elem));
    }); // Parse the HTML and extract just whatever code contains .statsTableContainer and has tr inside
    $(".text").each((_, elem) => contentList.push(genContent($, elem)));
    $("h4").each((_, elem) => titleList.push(genTitle($, elem)));
    const pasteList = titleList.map((_, i) => ({
        author: authorAndDateList[i].author.trim(),
        date: authorAndDateList[i].date,
        title: titleList[i].trim(),
        content: contentList[i].trim(),
    }));
    pasteList.map((paste) => __awaiter(void 0, void 0, void 0, function* () {
        yield Paste_1.default.create(paste).catch((err) => console.log(err));
    }));
    return pasteList;
};
const request = (baseURL) => __awaiter(void 0, void 0, void 0, function* () {
    yield Paste_1.default.deleteMany({});
    try {
        const client = axios_1.default.create({ baseURL, httpAgent: agent });
        const res = yield client.get("/");
        const pasteList = scraper(res.data);
        return pasteList;
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            console.error(error.message);
        }
        return "Failed.";
    }
});
exports.default = request;
