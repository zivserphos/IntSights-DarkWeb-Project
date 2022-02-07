import dotenv from "dotenv";

dotenv.config();

const config = {
  MONGO_URI: process.env.MONGO_URI || "undefined",
  PORT: process.env.PORT,
  SEND_INTERVAL: Number(process.env.SEND_INTERVAL) || 2000 * 60,
  MONGO_DOCKER: process.env.MONGO_DOCKER,
};

export default config;
