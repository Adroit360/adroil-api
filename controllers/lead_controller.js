const Lead = require("../models/lead_model");
const catchAsync = require("../utils/catchAsync");
const factory = require("../utils/handlerFactory");

exports.newLead = factory.createOne(Lead);

exports.allLeads = catchAsync(async (req, res) => {
  const leads = await Lead.find().sort("-createdAt");

  return res.status(200).json({
    status: "success",
    leads,
  });
});

exports.singleLead = catchAsync(async (req, res) => {
  const query = req.params.id;

  const lead = await Lead.findById(query);
  return res.status(200).json({ status: "success", lead });
});

exports.updateLead = factory.updateOne(Lead);
