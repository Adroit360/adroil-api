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
    contacts: [{ type: mongoose.Types.ObjectId, ref: "Contacts" }],
    opportunities: [{ type: mongoose.Types.ObjectId, ref: "Opportunities" }],
    files: [{ title: String, link: String }],
    active: { type: Boolean, default: true, select: false },
  },
  { timestamps: true }
);

// accountSchema.pre(/^findBy/, function (next) {
//   this.populate("contacts opportunities user");
//   this.findBy({ active: { $ne: false } });
//   next();
// });

module.exports = mongoose.model("Account", accountSchema);
