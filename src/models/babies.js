const mongoose = require('mongoose');

const babiesSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  dob: {
    type: Date,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    required: true,
    trim: true,
  },

  weight: {
    type: Number,
    required: true,
    trim: true,
  },
  height: {
    type: Number,
    required: true,
    trim: true,
  },
});

const Babies = mongoose.model('Babies', babiesSchema);

module.exports = Babies;
