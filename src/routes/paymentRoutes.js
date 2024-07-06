const express = require('express')
const router = express.Router()
const paymentController = require('../controllers/paymentController')
const {authenticate}  = require("../services/authService")


router.post('/create-checkout-session',authenticate, paymentController.createCheckoutSession);
router.get('/session-status',authenticate, paymentController.sessionStatus);
router.get('/history',authenticate,paymentController.getHistory)

module.exports = router