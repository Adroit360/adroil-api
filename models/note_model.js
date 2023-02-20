const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: [true, "note title required"] },
    description: { type: String, requirs: [true, "description required"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
