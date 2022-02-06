import { SocksProxyAgent } from "socks-proxy-agent";
import axios from "axios";
// import baseUrl from "../utils/helpers";

const proxy = "socks://localHost:9050";
const agent = new SocksProxyAgent(proxy);
const request = async (baseURL: string) => {
  try {
    const client = axios.create({ baseURL, httpAgent: agent });
    const res = await client.get("/");
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.message);
    }
    return "Failed.";
  }
};

export default request;
