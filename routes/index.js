var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'google-speech-nodejs-tutorial-20171201' });
});

module.exports = router;
