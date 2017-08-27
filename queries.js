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
  getSingleBezirk: getSingleBezirk,
  getAllPlanungsraeume: getAllPlanungsraeume,
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

function getSingleBezirk(req, res, next) {
  var bezirkID = parseInt(req.params.id);
  db.one('select id, name,  ST_AsGeoJSON(geom)::json AS geom from bezirke where id = $1', bezirkID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE Bezirk'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getAllPlanungsraeume(req, res, next) {
  db.any('select id, name,  ST_AsGeoJSON(geom)::json AS geom from planungsraeume')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL Planungsraeume'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}