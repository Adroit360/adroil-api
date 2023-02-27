const mongoose = require("mongoose");

const opportunitiesSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: [true, "Name is required"] },
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Accounts",
    },
    status: {
      type: String,
      enum: [
        "qualification",
        "meeting",
        "price qoute",
        "negotiation",
        "closed",
        "cancelled",
      ],
      default: "qualification",
    },
    close_date: Date,
    amount: Number,
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
    last_modified: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Opportunity", opportunitiesSchema);
