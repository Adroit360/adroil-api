const mongoose = require("mongoose");
const validator = require("validator");

const leadSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: [true, "Name is required"] },
    status: {
      type: String,
      enum: ["new", "contacted", "working", "qualified", "unqualified"],
      default: "new",
    },
    phone: String,
    company: String,
    email: {
      type: String,
      validate: [validator.isEmail, "Please provide a valid email address"],
      trim: true,
      unique: true,
      lowercase: true,
    },
    rating: { type: String, enum: ["hot", "warm", "cold"] },
    active: { type: Boolean, default: true },
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
    files: [{ title: String, link: String }],
  },
  { timestamps: true }
);

leadSchema.pre(/^find/, function (next) {
  this.populate(["notes"]);
  this.find({ active: { $ne: false } });
  next();
});

module.exports = mongoose.model("Lead", leadSchema);
