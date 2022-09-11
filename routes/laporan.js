const express = require('express');
const router = express.Router();
const laporan = require('../controllers/laporan');
var restrict = require('../middleware/restrict');

router.get('/',restrict, laporan.renderlaporan);
router.post('/getdetail',restrict, laporan.getDetail);

module.exports = router;