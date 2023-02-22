const Opportunities = require("../models/opportunities_model");
const Account = require("../models/account_model");

const catchAsync = require("../utils/catchAsync");
const factory = require("../utils/handlerFactory");

exports.addOpportunity = catchAsync(async (req, res) => {
  let oppo = await Opportunities.create(req.body);
  oppo.user = req.user.id;
  oppo.account = req.params.id;

  const account = await Account.findById(req.params.id);
  account.opportunities.push(oppo._id);

  await account.save();
  await oppo.save();

  return res.status(200).json({ status: "success", oppo });
});

exports.allOpportunities = factory.getAll(Opportunities);

exports.singleOpportunities = factory.getOne(Opportunities);

exports.updateOpportunities = factory.updateOne(Opportunities);

exports.deleteOpportunities = factory.softDelete(Opportunities);
