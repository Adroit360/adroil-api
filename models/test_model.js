const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  title: String,
  data: String,
});

module.exports = mongoose.model("Test", testSchema);
