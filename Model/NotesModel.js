const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim:true
  },
  category: {
    type: String,
    required: true,
    trim:true
  },
  notes: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
    required: true,
  },
  date:{
    type:Date,
    default:Date.now
  }
});

module.exports = mongoose.model("notes", notesSchema);
