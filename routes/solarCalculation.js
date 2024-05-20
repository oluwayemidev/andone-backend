// routes/solarCalculation.js
const express = require('express');
const router = express.Router();
const solarCalculationController = require('../controllers/SolarCalculationController');
const authMiddleware = require('../middleware/auth');

router.post('/', solarCalculationController.saveSolarCalculation);
router.get('/', solarCalculationController.getAllSolarCalculations);

module.exports = router;
