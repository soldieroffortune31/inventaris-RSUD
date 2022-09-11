const express = require('express');
const router = express.Router();
const ruangan = require('../controllers/ruangan');
var restrict = require('../middleware/restrict');

router.post('/',restrict, ruangan.create);
router.get('/',restrict, ruangan.index);
router.get('/inputruangan',restrict, ruangan.inputruangan);
router.get('/update/:id',restrict, ruangan.renderupdate)
router.post('/:id',restrict, ruangan.updateData);
router.get('/delete/:id',restrict, ruangan.deleteByUpdate);
router.delete('/:id',restrict, ruangan.delete);


module.exports = router;