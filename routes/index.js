var express = require('express');
var router = express.Router();

var db = require('../queries');

router.get('/api/bezirke', db.getAllBezirke);
router.get('/api/bezirke/:id', db.getSingleBezirk);
router.get('/api/planungsraeume', db.getAllPlanungsraeume);

/* GET home page. */
/*
router.get('/', function(req, res, next) {
  res.render('index', { title: 'GentriMap' });
});
*/

router.use(express.static('./frontend/dist'));

router.get('*', function(req, res) {
    res.sendfile('./frontend/dist/index.html'); // load our dist/index.html file
});


module.exports = router;