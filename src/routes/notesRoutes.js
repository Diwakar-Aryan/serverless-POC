const express = require('express')
const router = express.Router()
const notesController = require('../controllers/notesController');
const { authenticate } = require('../services/authService');

router.get('/',authenticate,notesController.getAll);
router.get('/locked',authenticate,notesController.getLockedNotesByUser);
router.post('/getSignedUrl',notesController.getSignedUrl)
router.post('/create',notesController.create);
router.post('/checkout',()=>console.log('checkout'))


module.exports = router