const mongoose = require("mongoose");

const connectDB = () => {
  const src = process.env.MONGODB;

  mongoose
    .connect(src, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    })
    .then(() => {
      console.log("successfully connected to database :)");
    })
    .catch((err) => {
      console.log("error connecting to database -_-");
      console.log(err);
    });
};

module.exports = connectDB;
