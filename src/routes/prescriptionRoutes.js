const router = require('express').Router();
const { getPrescriptions } = require('../controllers/prescriptionController');

router.get('/', getPrescriptions);

module.exports = router;
