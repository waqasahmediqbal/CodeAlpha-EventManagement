const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  events: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true
      },
      location: {
        type: String,
        required: true
      },
      organizer: {
        type: String,
        required: true
      },
      speakers: {
        type: String,
        required: true
      },
      category: {
        type: String,
        required: true
      },
      status: {
        type: String,
      },
      picture: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        required: true
      },
    },
  ],
});
module.exports = User = mongoose.model("user", UserSchema);
