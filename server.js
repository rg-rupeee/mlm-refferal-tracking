const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");

// database connection
require("./config/database")();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening to server on the port ${port}`);
});
