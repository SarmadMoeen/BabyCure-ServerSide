const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },

});

const Doctor= new mongoose.model('doctor', DoctorSchema);
module.exports = Doctor;