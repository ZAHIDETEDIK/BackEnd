const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const sauceController = require('../controllers/sauce');

router.get('/', auth, sauceController.getAllSauce);
router.post('/', auth, sauceController.createSauce);
router.get('/:id', auth, sauceController.getOneSauce);
router.put('/:id', auth, sauceController.modifySauce);
router.delete('/:id', auth, sauceController.deleteSauce);
router.post('/:id/like',auth,sauceController,likeDislikeSauce);

module.exports = router;