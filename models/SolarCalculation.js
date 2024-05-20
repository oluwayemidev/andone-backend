// models/SolarCalculation.js
const mongoose = require('mongoose');

const solarCalculationSchema = new mongoose.Schema({
  dataSource: {
    type: Array,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
  },
  submittedBy: {
    type: String,
  },
}, { timestamps: true });

const SolarCalculation = mongoose.model('SolarCalculation', solarCalculationSchema);

module.exports = SolarCalculation;
