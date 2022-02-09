/* eslint-disable no-use-before-define */
import { Handler, Response } from "express";
import scraper from "../services/scraper";
import baseUrl from "../utils/helpers";
import writeEvent from "../services/sse";
import config from "../utils/config";

const sse: Handler = async (req, res) => {
  if (req.headers.accept === "text/event-stream") {
    await sendEvent(res);
  } else {
    await sendEvent(res);
    // next({ status: 400, message: { error: "Invalid headers" } });
  }
};

const sendEvent = async (res: Response) => {
  res.writeHead(200, {
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "Content-Type": "text/event-stream",
  });

  const sseId = new Date().toDateString();

  setInterval(async () => {
    const response = await scraper(baseUrl);
    writeEvent(res, sseId, JSON.stringify(response));
  }, 10000);
  const response = await scraper(baseUrl);
  writeEvent(res, sseId, JSON.stringify(response));
};

export default sse;
