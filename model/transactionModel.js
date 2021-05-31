const mongoose = require("mongoose");

const transactionModel = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "A transaction must have a user"],
  },
  creditAmt: {
    type: Number,
    required: [true, "A transaction must have a credit amount"],
  },
  parent1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  parent1Credit: {
    type: Number,
  },
  parent2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  parent2Credit: {
    type: Number,
  },
  parent3: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  parent3Credit: {
    type: Number,
  },
});

const Transaction = mongoose.model("Transaction", transactionModel);
module.exports = Transaction;
