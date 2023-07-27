const express = require('express');
const router = express.Router();

// controllers
const password_controller = require('../controllers/password_controller');


router.get('/resetpage',password_controller.passwordResetPage);
router.get('/resetlink/:email',password_controller.passwordResetLink);
router.post('/resetdone',password_controller.passwordReset)

// export
module.exports = router;