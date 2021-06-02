const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");

const Wallet = require("./../model/walletModel");

exports.getIndex = catchAsync(async (req, res, next) => {
  // res.send("Helllo from server");
  const wallets = await Wallet.find().populate("user");
  // console.log(wallets);
  res.render("index", {
    wallets,
  });
});

exports.getUserDetails = catchAsync(async (req, res, next) => {
  console.log(req.query);
  const userWallet = await Wallet.findOne({
    userId: req.query.userId,
  }).populate({
    path: "user",
    populate: {
      path: "parent",
      populate: {
        path: "parent",
        populate: {
          path: "parent",
        },
      },
    },
  });
  console.log(JSON.stringify(userWallet, null, 4));
  let user = {};
  user.credits = userWallet.credits;
  user.name = userWallet.user.name;
  user.id = userWallet.user.userId;
  if (userWallet.user.parent) {
    user.parent1 = userWallet.user.parent.name;
    user.parent1Id = userWallet.user.parent.userId;
    if (userWallet.user.parent.parent) {
      user.parent2 = userWallet.user.parent.parent.name;
      user.parent2Id = userWallet.user.parent.parent.userId;
      if (userWallet.user.parent.parent.parent) {
        user.parent3 = userWallet.user.parent.parent.parent.name;
        user.parent3Id = userWallet.user.parent.parent.parent.userId;
      }
    }
  }
  // console.log(user);
  res.render("user-details", {
    user,
  });
});

exports.getAddCredit = catchAsync(async (req, res, next) => {
  // console.log(req.query.userId);
  res.render("add-credit", {
    id: req.query.userId,
  });
});
