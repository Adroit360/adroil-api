const Account = require("../models/account_model");
const catchAsync = require("../utils/catchAsync");

exports.addAccount = catchAsync(async (req, res) => {
  let account = new Account.create(req.body);
  account.user = req.user;

  await account.save();
  res.status(200).json({ status: "success", account });
});

exports.allAccount = catchAsync(async (req, res) => {});
