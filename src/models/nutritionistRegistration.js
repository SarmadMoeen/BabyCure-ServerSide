const mongoose = require('mongoose');

const NutritionistSchema = new mongoose.Schema({
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

const Nutritionist= new mongoose.model('nutritionist', NutritionistSchema);
module.exports = Nutritionist;