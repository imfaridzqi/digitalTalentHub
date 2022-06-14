const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LowonganSchema = new Schema({
  title: String,
  location: String,
  salary: Number,
  description: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  employer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Lowongan", LowonganSchema);
