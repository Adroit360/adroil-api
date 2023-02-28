const Contact = require("../models/contact_model");
const Account = require("../models/account_model");

const catchAsync = require("../utils/catchAsync");
const factory = require("../utils/handlerFactory");

exports.addContact = catchAsync(async (req, res) => {
  let contact = await Contact.create(req.body);
  contact.user = req.user.id;

  let account = await Account.findById(req.params.id);

  contact.accounts.push(req.params.id);
  account.contacts.push(contact._id);

  await account.save();
  await contact.save();

  res
    .status(200)
    .json({ status: "success", message: "Contact added successfully" });
});

exports.singleContact = catchAsync(async (req, res) => {
  const contact = await Contact.findById(req.params.id)
    .populate("user", "name")
    .populate("accounts", "name");

  res.status(200).json({ status: "success", contact });
});

exports.updateContact = factory.updateOne(Contact);

exports.allContact = factory.getAll(Contact);

exports.deleteContact = factory.deleteOne(Contact);

exports.addAccountToContact = catchAsync(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  const account = await Account.findById(req.body._id);

  account.contacts.push(contact._id);
  contact.accounts.push(account._id);

  await contact.save();
  await account.save();

  res.status(200).json({ status: "success", contact });
});

exports.unlinkAccountContact = catchAsync(async (req, res) => {
  const { contact, account } = req.body;

  const contactDet = await Contact.findById(contact).populate("accounts");
  const accountDet = await Account.findById(account);

  accountArray = contactDet.accounts;
  contactArray = accountDet.contacts;

  // const objWithIdIndex = arr.findIndex((obj) => obj.id === id);

  // contact.accounts.splice()

  // console.log("account", accountArray);
  // console.log("contact", contactArray);

  await factory.removeObjectWithId(accountArray, account);
  await factory.removeObjectWithId(contactArray, contact);

  // console.log("start here");

  // const accountIndex = contactDet.accounts.findIndex(
  //   (ind) => ind._id === account
  // );

  // console.log(accountIndex);

  await contact.save();
  await account.save();

  res
    .status(200)
    .json({ status: "success", message: "E finis. Me ano get anything talk" });
});
