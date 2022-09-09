const express = require('express');
const router = express.Router();
const ruangan = require('../controllers/ruangan');

router.post('/', ruangan.create);
router.get('/', ruangan.index);
router.get('/inputruangan', ruangan.inputruangan);
router.get('/update/:id', ruangan.renderupdate)
router.post('/:id', ruangan.updateData);
router.get('/delete/:id', ruangan.deleteByUpdate);
router.delete('/:id', ruangan.delete);


module.exports = router;