// models/Quotation.js
const mongoose = require('mongoose');

const QuotationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  product: {
    type: String,
    required: true,
  },
  installation_date: {
    type: Date,
    required: true,
  },
  message: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    default: 'Pending',
  },
}, { timestamps: true });

module.exports = mongoose.model('Quotation', QuotationSchema);
