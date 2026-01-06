const express = require('express');
const router = express.Router();
const importController = require('../controllers/importController');

router.post('/', importController.importarJSON);

module.exports = router;
