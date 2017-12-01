const express = require('express');
const router = express.Router();

const speechWorker = require('../speechWorker');

router.get('/alternatives', function(req, res, next) {
  res.json(speechWorker.alternatives);
});

router.get('/logs', function(req, res, next) {
  res.json(speechWorker.logs);
});

module.exports = router;