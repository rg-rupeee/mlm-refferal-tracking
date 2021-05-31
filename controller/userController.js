const User = require("./../model/userModel");

const catchAsync = require("./../utils/catchAsync");

exports.createUser = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);
  return res.json({
    status: "success",
    user,
  });
});

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find().populate("parent");
  return res.json({
    status: "success",
    users,
  });
});
