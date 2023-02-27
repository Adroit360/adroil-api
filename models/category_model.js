const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    size: Number,
    limit: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
