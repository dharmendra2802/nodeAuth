const express = require('express');
const router = express.Router();
const passport = require('passport');
// controllers
const edit_controller = require('../controllers/edit_controller');

router.post('/password/:id', edit_controller.changePassword);

module.exports = router;