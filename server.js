const dotenv = require("dotenv");

// handling uncaugnt exception
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION !!!");
  console.log(err);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });

const app = require("./app");

// database connection
require("./config/database")();

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`listening to server on the port ${port}`);
});

// handling unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION!!!");
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
