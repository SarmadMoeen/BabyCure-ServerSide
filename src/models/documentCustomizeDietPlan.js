const mongoose = require('mongoose');

const documentCustomizeDietPlanSchema = new mongoose.Schema({
  cause: {
    type: String,
    required: true
  },
  document: {
    type: String,
    required: true
  }
});

const DocumentCustomizeDietPlan = mongoose.model("DocumentCustomizeDietPlan", documentCustomizeDietPlanSchema);

module.exports = DocumentCustomizeDietPlan;

