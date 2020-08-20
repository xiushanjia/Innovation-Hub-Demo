var express = require('express');
var router = express.Router();
const myPool = require('./db_pool');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('testroute', { title: 'testroute' });
});

module.exports = router;