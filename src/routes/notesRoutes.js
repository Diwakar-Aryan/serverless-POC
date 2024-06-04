const express = require('express')
const router = express.Router()
const notesController = require('../controllers/notesController')

router.get('/', notesController.getAll);
router.post('/getSignedUrl',notesController.getSignedUrl)
router.post('/create',notesController.create);
router.post('/checkout',()=>console.log('checkout'))


module.exports = router