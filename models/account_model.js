const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: [true, "Name is required"] },
  phone: { type: String, required: [true, "Phone # is required"] },
  type: String,
  industry: String,
  contacts: [{ type: mongoose.Types.ObjectId, ref: "Contacts" }],
  opportunities: [{ type: mongoose.Types.ObjectId, ref: "Opportunities" }],
  files: [{ title: String, link: String }],
});
