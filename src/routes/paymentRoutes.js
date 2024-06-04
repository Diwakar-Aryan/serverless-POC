const express = require('express')
const router = express.Router()
const paymentController = require('../controllers/paymentController')

router.get('/create-checkout-session', paymentController.createCheckoutSession);
router.get('/session-status', paymentController.sessionStatus);

module.exports = router