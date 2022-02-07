/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { SocksProxyAgent } from "socks-proxy-agent";
import axios from "axios";
import cheerio from "cheerio";
import PasteSchema from "../db/models/Paste";

const proxy = "socks://localHost:9050";
const agent = new SocksProxyAgent(proxy);

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

const scraper = (html: string) => {
  const $ = cheerio.load(html); // Load the HTML string into cheerio
  const contentList: string[] = [];
  const titleList: string[] = [];
  const authorAndDateList: AuthorAndDate[] = [];
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

  pasteList.map(async (paste: Paste) => {
    await PasteSchema.create(paste).catch((err) => console.log(err));
  });

  return pasteList;
};

const request = async (baseURL: string) => {
  await PasteSchema.deleteMany({});
  try {
    const client = axios.create({ baseURL, httpAgent: agent });
    const res = await client.get("/");
    const pasteList = scraper(res.data);
    return pasteList;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.message);
    }
    return "Failed.";
  }
};

export default request;
