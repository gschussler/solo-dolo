const path = require('path');
const express = require('express');

const playerController = require('../controllers/playerController');

const router = express.Router();

// router.post('/', playerController.createPlayer, (req, res) => {
//   res.status(200).json({name: res.locals.name});
// })

module.exports = router;