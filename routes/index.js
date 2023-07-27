const express = require('express');
const router = express.Router();

// controllers
const home_controller = require('../controllers/home_controller');


router.get('/',home_controller.home);
router.use('/user',require('./user'));

// export
module.exports = router;