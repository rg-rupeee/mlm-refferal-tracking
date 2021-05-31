const mongoose = require("mongoose");

const walletModel = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, "A wallet must belong to a user"],
  },
  userId: {
    type: Number
  },
  credits: {
    type: Number,
    default: 0,
  },
});

const Wallet = mongoose.model("Wallet", walletModel);
module.exports = Wallet;
