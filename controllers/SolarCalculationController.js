// controllers/SolarCalculationController.js
const SolarCalculation = require('../models/SolarCalculation');

exports.saveSolarCalculation = async (req, res) => {
  try {
    const { name, email, message, dataSource } = req.body.data;
    const solarCalculation = new SolarCalculation({
      dataSource,
      name,
      email,
      message,
      submittedBy: `${name} (${email})`,
    });
    await solarCalculation.save();
    res.status(201).json({ message: 'Solar calculation saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAllSolarCalculations = async (req, res) => {
    try {
      const solarCalculations = await SolarCalculation.find();
      res.status(200).json(solarCalculations);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
