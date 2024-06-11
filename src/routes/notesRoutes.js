const express = require('express')
const router = express.Router()
const notesController = require('../controllers/notesController');
const { checkJwt, authenticate } = require('../services/authService');

router.get('/',authenticate, notesController.getAll);
router.post('/getSignedUrl',notesController.getSignedUrl)
router.post('/create',notesController.create);
router.post('/checkout',()=>console.log('checkout'))


module.exports = router