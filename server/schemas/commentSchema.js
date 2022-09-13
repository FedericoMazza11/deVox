const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  commentText: {
    type: String,
    required: true,
  },
  commentId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true
  },
  voxId: {
    type: String,
    required: true
  },
  metadata: [
    {
      ip: String,
      macaddres: String,
      location: String,
      city: String,
    }
  ],
  isURL: {
    type: Boolean,
    default: false
  },
  filename: {
    type: String,
  },
  fileExtension: {
    type: String,
  },
  hasMedia: {
    type: Boolean,
    required: true
  },
  url: {
    type: String,
  },
  anonColor: {
    type: String,
    required: true
  },
  anonNumber: {
    type: String,
    required: true
  },
  op: {
    type: Boolean,
    default: false
  },
  taggedTo: [],
  taggedBy: [],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Comments", CommentSchema);
