const User = require("./../model/userModel");

const walletController = require('./walletController');

const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.createUser = catchAsync(async (req, res, next) => {
  // console.log(req.body);

  if (req.body.parentId) {
    // find _id of user with userId req.body.parentId
    const parent = await User.findOne({ userId: req.body.parentId });
    if (!parent) {
      return next(
        new AppError(`No user exists with id: ${req.body.parentId}`, 400)
      );
    }
    // console.log(parent);
    req.body.parent = parent._id;
  }

  // console.log(req.body);
  const user = await User.create(req.body);

  walletController.createWallet(user._id, user.userId);

  return res.status(201).json({
    status: "success",
    user,
  });
});

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find().populate("parent").sort({ userId: 1 });
  return res.status(200).json({
    status: "success",
    results: users.length,
    users,
  });
});

exports.getUserById = catchAsync(async (req, res, next) => {
  // console.log(req.params);
  const user = await User.findOne({ userId: req.params.userId }).populate(
    "parent"
  );

  // console.log(user);

  if (!user) {
    return next(
      new AppError(`no user found with id : ${req.params.userId}`, 400)
    );
  }

  return res.status(200).json({
    status: "success",
    user,
  });
});

exports.updateUserById = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ userId: req.params.userId });

  // console.log(user);

  if (!user) {
    return next(
      new AppError(`no user found with id : ${req.params.userId}`, 400)
    );
  }

  const updatedUser = await User.findOneAndUpdate({ _id: user._id }, req.body, {
    new: true,
    runValidators: true,
  });

  // console.log(updatedUser);

  return res.status(200).json({
    status: "success",
    updatedUser,
  });
});

exports.deleteUserById = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ userId: req.params.userId });

  // console.log(user);

  if (!user) {
    return next(
      new AppError(`no user found with id : ${req.params.userId}`, 400)
    );
  }

  await User.findByIdAndDelete(user._id);

  return res.status(204).json({
    status: "success",
    user: null,
  });
});
