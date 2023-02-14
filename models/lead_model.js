const mongoose = require("mongoose");
const validator = require("validator");

const leadSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lead", leadSchema);
