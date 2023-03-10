const mongoose = require("mongoose");

const opportunitiesSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    account: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
    status: {
      type: String,
      enum: [
        "qualification",
        "meeting",
        "price qoute",
        "negotiation",
        "won",
        "lost",
        "cancelled",
      ],
      default: "qualification",
    },
    close_date: Date,
    amount: Number,
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
    last_modified: String,
    active: { type: Boolean, default: true },
    refId: String,
    quantity: Number,
  },
  { timestamps: true }
);

opportunitiesSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  this.populate(["notes", "user", "product", "account"]);
  next();
});

module.exports = mongoose.model("Opportunity", opportunitiesSchema);
