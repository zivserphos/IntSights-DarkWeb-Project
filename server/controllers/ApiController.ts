import { Handler } from "express";
import request from "../services/darkWebHtml";
import baseUrl from "../utils/helpers";

// eslint-disable-next-line no-return-await
const getPage: Handler = async (_req, res) => {
  const response = await request(baseUrl);
  res.send(response);
};

export default getPage;
