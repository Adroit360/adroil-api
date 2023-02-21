const Account = require("../models/account_model");
const catchAsync = require("../utils/catchAsync");

const factory = require("../utils/handlerFactory");

exports.addAccount = catchAsync(async (req, res) => {
  let account = new Account.create(req.body);
  account.user = req.user;

  await account.save();
  res.status(200).json({ status: "success", account });
});

exports.allAccount = factory.getAll(Account);

exports.singleAccount = factory.getOne(Account);

exports.updateAccount = factory.updateOne(Account);

exports.deacivateAccount = catchAsync(async (req, res) => {
  const account = await Account.findByIdAndUpdate(
    req.params.id,
    { active: false },
    { new: true, runValidators: true }
  );

  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    account,
  });
});
