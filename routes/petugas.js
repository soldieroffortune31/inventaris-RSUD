const express = require('express');
const router = express.Router();
const petugas = require('../controllers/petugas');
var restrict = require('../middleware/restrict');



router.post('/',restrict, petugas.create);
router.post('/updatepetugas/:id',restrict, petugas.updatepetugas);
router.get('/', restrict, petugas.index);
router.get('/inputpetugas',restrict, petugas.inputPetugas);
router.get('/update/:id',restrict, petugas.renderpetugas);
router.get('/updatepassword',restrict, petugas.renderpassword);
router.post('/update',restrict, petugas.updatepassword);

module.exports = router;