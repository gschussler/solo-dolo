const path = require('path');
const express = require('express');

const lobbyController = require('../controllers/lobbyController');

const router = express.Router();

router.post('/', lobbyController.createLobby, (req, res) => {
  res.status(200).json({name: res.locals.name});
})

module.exports = router;