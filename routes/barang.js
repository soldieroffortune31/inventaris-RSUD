const express = require('express');
const router = express.Router();
const barang = require('../controllers/barang');

router.post('/', barang.create);
router.post('/:id', barang.update);
router.get('/deletebyupdate/:id', barang.deleteByUpdate);
router.get('/', barang.renderbarang);
router.get('/previewbarang/:id', barang.renderpreview);
router.get('/inputbarang', barang.renderinputbarang);
router.get('/updatebarang/:id', barang.renderupdate);

module.exports = router;