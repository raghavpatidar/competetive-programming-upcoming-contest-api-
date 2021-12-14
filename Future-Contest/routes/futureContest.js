const express = require('express')
const { codeforces, codechef } = require('../controllers/futureCotestController');

const router = express.Router();

router.get('/codeforces', codeforces);
router.get('/codechef', codechef);

module.exports = router;