/* eslint-disable no-use-before-define */
import { Handler, Response } from "express";
import scraper from "../services/scraper";
import baseUrl from "../utils/helpers";
import writeEvent from "../services/sse";
import config from "../utils/config";

const sse: Handler = (req, res) => {
  if (req.headers.accept === "text/event-stream") {
    sendEvent(res);
  } else {
    res.json({ message: "Ok" });
  }
};

const sendEvent = (res: Response) => {
  res.writeHead(200, {
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "Content-Type": "text/event-stream",
  });

  const sseId = new Date().toDateString();

  setInterval(async () => {
    const data = JSON.stringify(await scraper(baseUrl));
    console.log(data);
    writeEvent(res, sseId, JSON.stringify(await scraper(baseUrl)));
  }, config.SEND_INTERVAL);
};

export default sse;

// eslint-disable-next-line no-return-await
// const sse: Handler = async (req, res) => {
//   if (req.headers.accept === "text/event-stream") {
//     sendEvent(req, res);
//   } else {
//     res.json({ message: "Ok" });
//   }
//   // const response = await request(baseUrl);
//   // res.send(response);
// };

// const SEND_INTERVAL = 2000;

// const writeEvent = (res: Response, sseId: string, data: string) => {
//   res.write(`id: ${sseId}\n`);
//   res.write(`data: ${data}\n\n`);
// };

// const sendEvent = (_req: Request, res: Response) => {
//   res.writeHead(200, {
//     "Cache-Control": "no-cache",
//     Connection: "keep-alive",
//     "Content-Type": "text/event-stream",
//   });

//   const sseId = new Date().toDateString();

//   setInterval(() => {
//     writeEvent(res, sseId, JSON.stringify(donation));
//   }, SEND_INTERVAL);

//   writeEvent(res, sseId, JSON.stringify(donation));
// };

// // app.get("/dashboard", (req: Request, res: Response) => {
// //   if (req.headers.accept === "text/event-stream") {
// //     sendEvent(req, res);
// //   } else {
// //     res.json({ message: "Ok" });
// //   }
// // });

// export default getPage;
