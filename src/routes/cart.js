const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cartController');
const { authenticate } = require('../services/authService');

router.post('/update',authenticate,cartController.updateCart)



module.exports = router