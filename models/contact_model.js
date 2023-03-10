const mongoose = require("mongoose");
const validator = require("validator");

const contactSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    accounts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Account" }],
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
    active: { type: Boolean, default: true, select: false },
    refId: String,
  },
  { timestamps: true }
);

// contactSchema.pre(/^find/, function (next) {
//   this.populate(["user", "accounts"]);
//   this.find({ active: { $ne: false } });
//   next();
// });

// contactSchema.pre(/^find/, function (next) {
//   this.populate(["user", "account"]);
//   this.find({ active: { $ne: false } });
//   next();
// });

module.exports = mongoose.model("Contact", contactSchema);
