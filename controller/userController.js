const User = require("./../model/userModel");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.json({
      status: "success",
      user
    });
  } catch (err) {
    console.log(err);
    return res.json({
      status: "fail",
      error: err,
    });
  }
};


exports.getAllUsers = async (req, res) => {
  try{
    const users = await User.find().populate("parent");
    return res.json({
      status: "success",
      users
    })
  }
  catch(err){
    console.log(err);
    return res.json({
      status: "fail",
      error: err,
    });
  }
}