/* eslint-disable no-use-before-define */
import { Handler, Response } from "express";
import scraper from "../services/scraper";
import baseUrl from "../utils/helpers";
import writeEvent from "../services/sse";
import config from "../utils/config";

// console.log(config.SEND_INTERVAL);

const sse: Handler = (req, res, next) => {
  if (req.headers.accept === "text/event-stream") {
    sendEvent(res);
  } else {
    next({ status: 400, message: { error: "Invalid headers" } });
  }
};

const sendEvent = (res: Response) => {
  res.writeHead(200, {
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "Content-Type": "aplication/json",
  });

  const sseId = new Date().toDateString();

  setInterval(async () => {
    const data = JSON.stringify(await scraper(baseUrl));
    console.log(data);
    let i = 0;
    if (i === 0) {
      i += 1;
      writeEvent(res, sseId, JSON.stringify(await scraper(baseUrl)));
    }
  }, config.SEND_INTERVAL);
};

export default sse;
