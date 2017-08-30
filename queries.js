//var promise = require('bluebird');

var options = {
  // Initialization Options
  //promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/gentrimap_01';
var db = pgp(connectionString);

var db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'gentrimap_02',
    user: 'gentrimap_01',
    password: 'h46aYNjlvqd67G5y'
});

// add query functions

module.exports = {
  getAllBezirke: getAllBezirke,
  getAllBezirkeDemographie: getAllBezirkeDemographie,
  getSingleBezirkeDemographie : getSingleBezirkeDemographie
};

function getAllBezirke(req, res, next) {
  db.any('select id, name,  ST_AsGeoJSON(ST_Transform(geom,4326))::json AS geom from bezirke')
    .then(function (data) {
    	var bezirke = [];
    	for (let datum of data) {
    		var bezirk = {
    			id : datum.id,
    			type : 'bezirke',
    			attributes : datum
    		};
    		bezirk.attributes.geojson = {
    			type : "FeatureCollection",
    			features : [
    				{
    					type : "Feature",
    					geometry : bezirk.attributes.geom,
    					properties : {},
    					crs : {
    						type: "name",
							  properties: {
							    name: "epsg:4326"
							    }
    					}
    				}
    			]
    		}
    		bezirk.attributes.geom = null;
    		bezirke.push(bezirk);
    	}
      res.status(200)
        .json({
          data: bezirke
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getAllBezirkeDemographie(req, res, next)  {
  db.task('get-bezirke-demographie', t => {
        return t.batch([
            t.any('select * from bezirk_demographie'),
           // t.any('select * from demographie_key')
        ]);
    })
    .then(data => {
        // data[0] = result from the first query;
        // data[1] = result from the second query;
        var bezirke_demographie = [];
        for (let datum of data[0]) {
          var bezirk_demo = {
            id : datum.year + datum.bezirk_id,
            type : 'bezirk/demographie',
            attributes : datum
          };
          bezirke_demographie.push(bezirk_demo);
        }
        res.status(200)
        .json({
          data: bezirke_demographie
        });
    })
    .catch(err => {
        return next(err);
    });
}

function getSingleBezirkeDemographie(req, res, next) {
  var bdID = req.params.id;
  var bdIDArray = [bdID.substring(0, 4) , bdID.substring(4)];
  db.task('get-bezirke-demographie', t => {
        return t.batch([
            t.one('select * from bezirk_demographie where year = $1 and bezirk_id = $2', bdIDArray)
        ]);
    })
    .then(data => {
        
        var bezirk_demo = {
          id : data[0].year + data[0].bezirk_id,
          type : 'bezirk/demographie',
          attributes : data[0]
        };
          
        res.status(200)
        .json({
          data: bezirk_demo
        });
    })
    .catch(err => {
        return next(err);
    });
}