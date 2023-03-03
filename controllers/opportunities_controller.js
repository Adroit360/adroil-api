const Opportunities = require("../models/opportunities_model");
const Account = require("../models/account_model");
const Note = require("../models/note_model");

const catchAsync = require("../utils/catchAsync");
const factory = require("../utils/handlerFactory");

exports.addOpportunity = catchAsync(async (req, res) => {
  var reference;

  await factory.verifyId(Opportunities).then((result) => {
    reference = result;
  });

  let oppo = await Opportunities.create(req.body);
  oppo.user = req.user.id;
  oppo.account = req.params.id;
  oppo.refId = reference;

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

exports.updateWithNote = catchAsync(async (req, res) => {
  const { title, description } = req.body;
  const id = req.params.id;

  let notes = await Note.create({ title, description });

  let oppo = await Opportunities.findByIdAndUpdate(
    id,
    { status: title },
    { new: true, runValidators: true }
  );

  oppo.notes.push(notes._id);

  await oppo.save();
  await notes.save();

  res.status(200).json({ status: "success", oppo });
});
