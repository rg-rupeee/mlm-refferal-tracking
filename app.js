const express = require("express");
const morgan = require("morgan");
const app = express();

const AppError = require("./utils/appError");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));

// logging routes accessed to console
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

const userRoutes = require("./routes/userRoutes");
const walletRoutes = require("./routes/walletRoutes");
app.use("/api/user", userRoutes);
app.use("/api/wallet", walletRoutes);

// 404 route not found
app.all("*", (req, res, next) => {
  next(new AppError(`Cannot  find ${req.originalUrl} on this server`, 404));
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.log("global Error handling middle ware");
  console.log(err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "fail";
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
