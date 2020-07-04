// models.User.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  // What is the user's role in the app
  role: {
    type: String,
    required: true
  },
  // All unique info for the user
  info: {
    userName: {
      type: String,
      required: true
    },
    first_name: {
      type: String,
      required: true
    },
    last_name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    createdDate: {
      type: Date,
      default: Date.now
    },
  },
  favoritedShows: [
    {
      type: Schema.Types.ObjectId,
      ref: "Shows"
    }
  ],
  watchList: [
    {
      type: Schema.Types.ObjectId,
      ref: "Show"
    }
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
