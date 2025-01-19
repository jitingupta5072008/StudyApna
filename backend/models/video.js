const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  thumbnail: { type: String, required: true },
  chapterId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Chapter", // Referring to Chapter model
    required: true 
  },
});

module.exports = mongoose.model("Video", videoSchema);
