const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
    emoji: { type: String},
  name: { type: String, required: true },
});

module.exports = mongoose.model("Class", classSchema);
