var express = require('express');
var router = express.Router();

var db = require('../queries');


router.get('/api/ebenen', db.getEbenen);
router.get('/api/ebene/:id', db.getEbene);
router.get('/api/ebene/:id/demographie', db.getAllEbeneDemographie);
router.get('/api/ebene/:id/demographie/:dem_id', db.getSingleEbeneDemographie);

router.get('/api/ebene/:id/demographie-key', db.getDemographieKey);

router.get('/api/bezirke', db.getAllBezirke);
router.get('/api/bezirk/demographie', db.getAllBezirkeDemographie);
router.get('/api/bezirk/demographie/:id', db.getSingleBezirkeDemographie);


//router.get('/api/bezirke/:id', db.getSingleBezirk);
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