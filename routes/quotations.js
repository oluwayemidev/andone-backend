// routes/quotations.js
const express = require('express');
const router = express.Router();
const quotationController = require('../controllers/quotationController');

router.post('/', quotationController.createQuotation);
router.get('/', quotationController.getAllQuotations);
router.put('//status', quotationController.updateQuotationStatus);

module.exports = router;
