/* eslint-disable @typescript-eslint/no-unused-vars */
import { SocksProxyAgent } from "socks-proxy-agent";
import axios from "axios";
import cheerio from "cheerio";

const proxy = "socks://localHost:9050";
const agent = new SocksProxyAgent(proxy);

const genAuthor = ($: cheerio.Root, elem: cheerio.Element) => {
  // Load the HTML string into cheerio
  const details = $(elem)
    .find("div")
    .first()
    .text()
    .split("Posted by")[1] // gives you string like that {Author} at {Date}
    .split("at"); // split into title[0] and date[1]
  const author = details[0]; // title
  return author;
};

const genDate = ($: cheerio.Root, elem: cheerio.Element) => {
  // Load the HTML string into cheerio
  const details = $(elem)
    .find("div")
    .first()
    .text()
    .split("Posted by")[1] // gives you string like that {Author} at {Date}
    .split("at"); // split into title[0] and date[1]
  const date = new Date(details[1]); // date
  return date;
};

const genTitle = ($: cheerio.Root, elem: cheerio.Element) => $(elem).text();
const genContent = ($: cheerio.Root, elem: cheerio.Element) => $(elem).text();

const scraper = (html: string) => {
  const $ = cheerio.load(html); // Load the HTML string into cheerio
  const dateList = $(".pre-footer > div").each((_, elem) => genDate($, elem));
  const authorList = $(".pre-footer > div").each((_, elem) =>
    genAuthor($, elem)
  ); // Parse the HTML and extract just whatever code contains .statsTableContainer and has tr inside
  const contentList = $(".text").each((_, elem) => genContent($, elem));
  const titleList = $("h4").each((_, elem) => genTitle($, elem));

  const pasteList = titleList.map((i) => ({
    author: authorList[i],
    date: dateList[i],
    title: titleList[i],
    content: contentList[i],
  }));

  return pasteList;
};

const request = async (baseURL: string) => {
  try {
    const client = axios.create({ baseURL, httpAgent: agent });
    const res = await client.get("/");
    scraper(res.data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.message);
    }
    return "Failed.";
  }
};

export default request;
