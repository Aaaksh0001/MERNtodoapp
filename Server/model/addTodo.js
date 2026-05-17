const mongoose = require('mongoose');

let addSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    unique: true
  },

  priority: {
    type: String,
    required: true
  },

  isComplet: {
    type: Boolean,
    enum: [true, false],
    default: false
  },

  createdDate: {
    type: Date,
    default: Date.now
  }
});

let addModel = mongoose.model("addSchema", addSchema);

module.exports = addModel;