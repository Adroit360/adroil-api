const User = require("../models/user_model");
const catchAsync = require("../utils/catchAsync");

exports.allUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  return res.status(200).json({ status: "success", users });
});
