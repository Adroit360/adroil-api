const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    title: { type: String, required: [true, "Title is required"] },
    description: String,
    price: Number,
    size: Number,
    limit: Number,
    quantity: Number,
    expiry_date: Date,
    active: { type: Boolean, default: true },
    refId: String,
  },
  { timestamps: true }
);

productSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

module.exports = mongoose.model("Product", productSchema);
