const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    link: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Files", fileSchema);
