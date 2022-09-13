const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  voxId: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  commentId: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Reports", ReportSchema);
