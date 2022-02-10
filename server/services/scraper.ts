/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { SocksProxyAgent } from "socks-proxy-agent";
import axios from "axios";
import cheerio from "cheerio";

import PasteSchema from "../db/models/Paste";
import getCategory from "./category/getCategory";

// const proxy = "socks://localHost:9050";
const proxy = {
  host: "tor-proxy",
  port: 8118,
};
// const agent = new SocksProxyAgent(proxy);

const genAuthorAndDate = (
  $: cheerio.Root,
  elem: cheerio.Element
): AuthorAndDate => {
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

const genTitle = ($: cheerio.Root, elem: cheerio.Element) => $(elem).text();
const genContent = ($: cheerio.Root, elem: cheerio.Element) => $(elem).text();
const pasteId = ($: cheerio.Root, elem: cheerio.Element) => $(elem).text();

const scraper = (html: string) => {
  const $ = cheerio.load(html); // Load the HTML string into cheerio
  const contentList: string[] = [];
  const titleList: string[] = [];
  const pasteIdsList: string[] = [];
  const authorAndDateList: AuthorAndDate[] = [];
  $(".pre-footer > div").each((_, elem) => {
    authorAndDateList.push(genAuthorAndDate($, elem));
  }); // Parse the HTML and extract just whatever code contains .statsTableContainer and has tr inside
  $(".text").each((_, elem) => contentList.push(genContent($, elem)));
  $("h4").each((_, elem) => titleList.push(genTitle($, elem)));
  $("a");
  const pasteList = contentList.map((_, i) => ({
    author: authorAndDateList[i].author.trim(),
    date: authorAndDateList[i].date,
    title: titleList[i].trim(),
    content: contentList[i].trim(),
    category: getCategory(contentList[i].trim()),
  }));

  pasteList.map(async (paste: Paste) => {
    const isExist = await PasteSchema.find({ id: paste.id });
    if (isExist.length === 0)
      await PasteSchema.create(paste).catch((err) => console.log(err));
  });

  return pasteList;
};

const mainScraper = async (baseURL: string) => {
  try {
    // const client = axios.create({ baseURL, httpAgent: agent });
    // const res = await client.get("/");
    // const pasteList = scraper(res.data);
    // return pasteList;
    const res = await axios.get(baseURL, { proxy });
    return scraper(res.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.message);
    }
    console.log(error);
    return "Failed.";
  }
};

export default mainScraper;
