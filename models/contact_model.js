const mongoose = require("mongoose");
const validator = require("validator");

const contactSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    account: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
    name: { type: String, required: [true, "Name is required"] },
    email: {
      type: String,
      validate: [validator.isEmail, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    phone: String,
    mobile: String,
    title: String,
    address: {
      street: String,
      website: String,
      city: String,
      state: String,
      country: String,
      zip: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
