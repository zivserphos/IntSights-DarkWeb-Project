import dotenv from "dotenv";

dotenv.config();

const config = {
  MONGO_URI: process.env.MONGO_URI || "undefined",
  PORT: process.env.PORT,
  SEND_INTERVAL: Number(process.env.PORT) || 2000 * 60,
};

export default config;
