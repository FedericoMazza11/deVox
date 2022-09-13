const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  userPassword: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  fistTime: {
    type: Boolean,
    default: true,
  },
  isBanned: {
    type: Boolean,
    default: false
  },
  commentDelay: {
    type: Date,
    default: Date.now
  },
  voxDelay: {
    type: Date,
    default: Date.now
  },
  notifications: [{
    title: String,
    description: String,
    isAnnouncement: Boolean,
    voxId: String,
    url: String,
    date: Date,
  }],
  hiddenWords: [],
  hiddenCategories: [],
});

module.exports = mongoose.model("Users", UserSchema);
