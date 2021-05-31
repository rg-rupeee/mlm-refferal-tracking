const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    maxlength: 120,
    required: ["true", "A user must have a name"],
  },
  userId: {
    type: Number,
    unique: true,
    required: [true, "A user must have an id"],
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
