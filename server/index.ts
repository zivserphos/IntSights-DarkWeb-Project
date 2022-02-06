import app from "./app";
import config from "./utils/config";
import "./db/mongo";

app.listen(config.PORT, () => {
  console.log(`Listening on port ${config.PORT}`);
});
