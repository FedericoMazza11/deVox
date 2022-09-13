const mongoose = require("mongoose");

const VoxSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: Number,
    default: 0,
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  fileExtension: {
    type: String,
    required: true,
  },
  isURL: {
    type: Boolean,
    default: false
  },
  username: {
    type: String,
    required: true,
  },
  metadata: [
    {
      ip: String,
      macaddres: String,
      location: String,
      city: String,
    }
  ],
  date: {
    type: Date,
    default: Date.now
  },
  url: {
    type: String,
  },
  lastUpdate: {
    type: Date,
    default: Date.now
  },
  sticky: {
    type: String,
    default: false
  },
  commentsCount: {
    type: Number,
    default: 0,
  }
});

module.exports = mongoose.model("Voxes", VoxSchema);
