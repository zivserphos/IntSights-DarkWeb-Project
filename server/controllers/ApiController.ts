/* eslint-disable no-use-before-define */
import { Handler, Response } from "express";
import scraper from "../services/scraper";
import baseUrl from "../utils/helpers";
import writeEvent from "../services/sse";
import config from "../utils/config";

// console.log(config.SEND_INTERVAL);

const sse: Handler = (req, res) => {
  if (req.headers.accept === "text/event-stream") {
    sendEvent(res);
  } else {
    sendEvent(res);
    // next({ status: 400, message: { error: "Invalid headers" } });
  }
};

const sendEvent = (res: Response) => {
  res.writeHead(200, {
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "Content-Type": "html/text",
  });

  const sseId = new Date().toDateString();

  setInterval(async () => {
    const response = await scraper(baseUrl);
    // console.log(data);
    writeEvent(res, sseId, response);
  }, config.SEND_INTERVAL);
};

export default sse;
