const _ = require("lodash");
const csv = require("csvtojson");

const Lead = require("../models/lead_model");
const Note = require("../models/note_model");

const catchAsync = require("../utils/catchAsync");
const factory = require("../utils/handlerFactory");

exports.newLead = catchAsync(async (req, res) => {
  var reference;

  await factory.verifyId(Lead).then((result) => {
    reference = result;
  });

  let doc = await Lead.create(req.body);
  doc.user = req.user.id;
  doc.refId = reference;

  await lead.save();
  res.status(200).json({ status: "success", doc });
});

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

exports.uploadLead = catchAsync(async (req, res) => {
  csv()
    .fromFile(req.file.path)
    .then(async (fileObj) => {
      var items = [];
      for (var i = 0; i < fileObj.length; i++) {
        var reference;

        await factory.verifyId(Lead).then((result) => {
          reference = result;
        });

        var obj = {};
        obj.user = req.user.id;
        obj.name = fileObj[i]["name"];
        obj.status = fileObj[i]["status"];
        obj.phone = fileObj[i]["phone"];
        obj.company = fileObj[i]["company"];
        obj.email = fileObj[i]["email"];
        obj.rating = fileObj[i]["rating"];
        obj.refId = reference;

        items.push(obj);
      }

      Lead.insertMany(items).then(() => {
        res
          .status(200)
          .json({ status: "success", message: "Successfully uploaded" });
      });
    });
});
