const Contact = require("../models/contact_model");
const Account = require("../models/account_model");

const catchAsync = require("../utils/catchAsync");
const factory = require("../utils/handlerFactory");

exports.addContact = catchAsync(async (req, res) => {
  let contact = await Contact.create(req.body);
  contact.user = req.user.id;

  let account = await Account.findById(req.params.id);

  contact.account.push(req.params.id);
  account.contacts.push(contact._id);

  await account.save();
  await contact.save();

  res
    .status(200)
    .json({ status: "success", message: "Contact added successfully" });
});

exports.singleContact = factory.getOne(Contact);

exports.updateContact = factory.updateOne(Contact);

exports.allContact = factory.getAll(Contact);

exports.deleteContact = factory.deleteOne(Contact);
