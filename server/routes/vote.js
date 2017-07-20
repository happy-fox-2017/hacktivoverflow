const express = require('express');
const router = express.Router();
var Vote = require('../controllers/voter');
const jwtHelper = require('../helper/jwtHelpers')

router.post('/',  Vote.createVoter);
router.get('/', Vote.showAllVoter);
router.get('/:id',  Vote.showOneVoter);
router.put('/:id',  Vote.updateVoter);
router.delete('/:id', Vote.deleteVoter);

module.exports = router;
