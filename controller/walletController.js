const Wallet = require("./../model/walletModel");

const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const User = require("../model/userModel");

exports.createWallet = async (_id, userId) => {
  try {
    const wallet = await Wallet.create({
      user: _id,
      userId,
      credits: 0,
    });

    // console.log(wallet);
    return wallet;
  } catch (err) {
    console.log(err);
  }
};

exports.getAllWallets = catchAsync(async (req, res, next) => {
  const wallets = await Wallet.find().populate("user");

  return res.status(200).json({
    status: "success",
    results: wallets.length,
    wallets,
  });
});

exports.getWalletById = catchAsync(async (req, res, next) => {
  const wallet = await Wallet.findOne({ userId: req.params.userId }).populate(
    "user"
  );

  // console.log(wallet);

  if (!wallet) {
    return next(
      new AppError(`No wallet exists with id: ${req.params.userId}`, 400)
    );
  }

  return res.status(200).json({
    status: "success",
    wallet,
  });
});

exports.addCredit = catchAsync(async (req, res, next) => {
  // console.log(req.params.userId);
  // console.log(req.body);
  // find user with 3 level deep populate
  const userWallet = await Wallet.findOne({
    userId: req.params.userId,
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
  // console.log(userWallet);

  if (!userWallet) {
    return next(
      new AppError(`No user exists with id : ${req.params.userId}`, 400)
    );
  }

  const creditDetails = [];

  const userAmt = userWallet.credits;

  let parent1, parent2, parent3;
  if (userWallet.user.parent) {
    parent1 = userWallet.user.parent;
    if (parent1.parent) {
      parent2 = parent1.parent;
      if (parent2.parent) {
        parent3 = parent2.parent;
      }
    }
  }

  // console.log({ parent1, parent2, parent3 });

  // add credit to user wallet
  let userCredit = parseInt(userWallet.credits) + parseInt(req.body.credit);
  const updatedUserWallet = await Wallet.findOneAndUpdate(
    {
      userId: req.params.userId,
    },
    {
      credits: userCredit,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  creditDetails.push(
    `added ${req.body.credit} credits to user with id: ${req.params.userId}`
  );

  // if parent 1 exists -> find wallet -> add credits
  let updatedp1Wallet;
  if (parent1) {
    const p1Wallet = await Wallet.findOne({ userId: parent1.userId });
    // console.log(p1Wallet);
    const p1Credits =
      parseInt(p1Wallet.credits) + parseInt(req.body.credit) * 0.4;
    updatedp1Wallet = await Wallet.findOneAndUpdate(
      {
        userId: parent1.userId,
      },
      {
        credits: p1Credits,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    // console.log(updatedp1Wallet);
    creditDetails.push(
      `parent1: added ${parseInt(req.body.credit) * 0.4} credits to user with id: ${
        parent1.userId
      } `
    );
  }

  // if parent 2 exits -> find wallet -> add credits
  let updatedp2Wallet;
  if (parent2) {
    const p2Wallet = await Wallet.findOne({ userId: parent2.userId });
    const p2Credits =
      parseInt(p2Wallet.credits) + parseInt(req.body.credit) * 0.2;
    updatedp2Wallet = await Wallet.findOneAndUpdate(
      {
        userId: parent2.userId,
      },
      {
        credits: p2Credits,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    // console.log(updatedp2Wallet);
    creditDetails.push(
      `parent2: added ${parseInt(req.body.credit) * 0.2} credits to user with id: ${
        parent2.userId
      } `
    );
  }

  // if parent 3 exists -> find wallet -> add credits
  let updatedp3Wallet;
  if (parent3) {
    const p3Wallet = await Wallet.findOne({ userId: parent3.userId });
    const p3Credits =
      parseInt(p3Wallet.credits) + parseInt(req.body.credit) * 0.1;
    updatedp3Wallet = await Wallet.findOneAndUpdate(
      {
        userId: parent3.userId,
      },
      {
        credits: p3Credits,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    // console.log(updatedp3Wallet);
    creditDetails.push(
      `parent3: added ${parseInt(req.body.credit) * 0.1} credits to user with id: ${
        parent3.userId
      } `
    );
  }

  return res.json({
    message: "hello",
    creditDetails,
    updatedUserWallet,
    updatedp1Wallet,
    updatedp2Wallet,
    updatedp3Wallet,
  });
});
