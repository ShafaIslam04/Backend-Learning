import app from "./app";
import config from "./config";
import { initDb } from "./db";

const main = () =>{
  initDb(); // database is created when the server runs
  app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}`);
});
}
main()