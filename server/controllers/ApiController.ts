/* eslint-disable no-use-before-define */
import { Handler, Response } from "express";
import scraper from "../services/scraper";
import baseUrl from "../utils/helpers";
import writeEvent from "../services/sse";
import config from "../utils/config";
import getStats from "../services/dashboard/stats";
import PasteS from "../db/models/Paste";

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
    await scraper(baseUrl);
    const pastes: Paste[] = await PasteS.find({});
    const stats = getStats(pastes);
    console.log(stats);
    writeEvent(res, sseId, JSON.stringify({ pastes, stats }));
  }, config.SEND_INTERVAL);
  await scraper(baseUrl);
  const pastes: Paste[] = await PasteS.find({});
  const stats = getStats(pastes);
  writeEvent(res, sseId, JSON.stringify({ pastes, stats }));
};

export default sse;
