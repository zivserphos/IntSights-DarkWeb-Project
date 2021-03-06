import mongoose, { ConnectOptions } from "mongoose";
import config from "../utils/config";

const mongo: Promise<void> = mongoose
  .connect(
    config.MONGO_DOCKER as string,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions
  )
  .then(() => {
    console.log("Connected to mongo successfully");
  })
  .catch((error) => {
    console.log(config.MONGO_DOCKER);
    console.log("error connecting to MongoDB:", error.message);
  });

export default mongo;
