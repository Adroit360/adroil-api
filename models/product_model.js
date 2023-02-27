const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  title: { type: String, required: [true, "Title is required"] },
});
