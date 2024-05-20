const Quotation = require('../models/Quotation');

// Create a new quotation
exports.createQuotation = async (req, res) => {
  try {
    const newQuotation = new Quotation(req.body);
    await newQuotation.save();
    res.status(201).json(newQuotation);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all quotations
exports.getAllQuotations = async (req, res) => {
  try {
    const quotations = await Quotation.find();
    res.status(200).json(quotations);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update quotation status
exports.updateQuotationStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    const updatedQuotation = await Quotation.findByIdAndUpdate(id, { status }, { new: true });
    res.status(200).json(updatedQuotation);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
