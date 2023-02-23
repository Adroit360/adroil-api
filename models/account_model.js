const mongoose = require("mongoose");
const validator = require("validator");

const accountSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: [true, "Name is required"] },
    phone: { type: String, required: [true, "Phone # is required"] },
    email: {
      type: String,
      unique: true,
      trim: true,
      validate: [validator.isEmail, "Email is required"],
    },
    type: String,
    industry: String,
    contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Contact" }],
    opportunities: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Opportunity" },
    ],
    files: [{ title: String, link: String }],
    active: { type: Boolean, default: true, select: false },
  },
  { timestamps: true }
);

accountSchema.pre(/^find/, function (next) {
  this.populate(["user", "contacts", "opportunities"]);
  this.find({ active: { $ne: false } });
  next();
});

module.exports = mongoose.model("Account", accountSchema);
