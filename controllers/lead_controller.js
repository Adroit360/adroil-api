const _ = require("lodash");

const Lead = require("../models/lead_model");
const Note = require("../models/note_model");

const catchAsync = require("../utils/catchAsync");
const factory = require("../utils/handlerFactory");

exports.newLead = factory.createOne(Lead);

exports.allLeads = catchAsync(async (req, res) => {
  console.log("Hello Enoch");
  const leads = await Lead.find().sort("-createdAt").populate("user", "name");

  return res.status(200).json({
    status: "success",
    leads,
  });
});

exports.singleLead = catchAsync(async (req, res) => {
  const query = req.params.id;

  const lead = await Lead.findById(query).populate("user");
  return res.status(200).json({ status: "success", lead });
});

exports.updateLead = factory.updateOne(Lead);

exports.updateWithNote = catchAsync(async (req, res) => {
  const { title, description } = req.body;
  const id = req.params.id;

  let notes = await Note.create({ title, description });

  let lead = await Lead.findByIdAndUpdate(
    id,
    { status: title },
    { new: true, runValidators: true }
  );

  lead.notes.push(notes._id);

  await lead.save();
  await notes.save();

  res.status(200).json({ status: "success", lead });
});
