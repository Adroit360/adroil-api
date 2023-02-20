const mongoose = require("mongoose");

const opportunitiesSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: [true, "Name is required"] },
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Accounts",
      required: [true, "Account is required"],
    },
    status: {
      tpye: String,
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
    notes: [{ type: Schema.Types.ObjectId, ref: "Note" }],
    last_modified: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Opportunities", opportunitiesSchema);
