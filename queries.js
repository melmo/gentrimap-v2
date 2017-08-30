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
  getEbenen : getEbenen,
  getEbene : getEbene,
  getAllEbeneDemographie: getAllEbeneDemographie,
  getSingleEbeneDemographie : getSingleEbeneDemographie,
  getAllBezirke: getAllBezirke,
  getAllBezirkeDemographie: getAllBezirkeDemographie,
  getSingleBezirkeDemographie : getSingleBezirkeDemographie
};


function getEbenen(req,res,next) {
  var ebenen = [];
  var ebeneIDs = ['bezirke','prognoseraeume','bezirksregionen','planungsraeume'];
  var ebeneNames = ['Bezirke','Prognoseräume','Bezirksregionen','Planungsräume'];
  for (var i = 0; i < ebeneIDs.length; i++) {
    var ebene = {
      id : ebeneIDs[i],
      type : 'ebene',
      attributes : {
        id : ebeneIDs[i],
        name : ebeneNames[i],
        type : 'ebene',
        geojson : {"type": "MultiLineString", "coordinates": []}
      }
    };
    ebenen.push(ebene);
  }
  
  try {
    res.status(200)
    .json({
      data: ebenen
    });

  } catch(err) {
    return next(err);
  }
}

function getEbene(req, res, next) {
  var ebeneType = req.params.id;

  db.any('select id, name,  ST_AsGeoJSON(ST_Transform(geom,4326))::json AS geom from $1:raw', ebeneType)
    .then(function (data) {
      var ebene = [];
      for (let datum of data) {
        datum.type = ebeneType;
        var raum = {
          id : datum.id,
          type : 'ebene',
          attributes : datum
        };
        var tempGeom = raum.attributes.geom;
        raum.attributes.geom = undefined;
        raum.attributes.geojson = {
          type : "FeatureCollection",
          features : [
            {
              type : "Feature",
              geometry : tempGeom,
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
        
        ebene.push(raum);
      }
      res.status(200)
        .json({
          data: ebene
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

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
            t.any('select * from bezirke_demographie'),
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

function getAllEbeneDemographie(req, res, next)  {
  var ebeneID = req.params.id;
  db.task('get-ebene-demographie', t => {
        return t.batch([
            t.any('select * from $1:raw_demographie', ebeneID),
           // t.any('select * from demographie_key')
        ]);
    })
    .then(data => {
        // data[0] = result from the first query;
        // data[1] = result from the second query;
        var ebene_demographie = [];
        for (let datum of data[0]) {
          var ebene_demo = {
            id : req.params.id + '_' + datum.year + datum.raum_id, 
            type : 'data/demographie',
            attributes : datum
          };
          ebene_demographie.push(ebene_demo);
        }
        res.status(200)
        .json({
          data: ebene_demographie
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

function getSingleEbeneDemographie(req, res, next) {
  var demID = req.params.dem_id;
  var demIDArray = [req.params.id, demID.substring(0, 4) , demID.substring(4)];
  db.task('get-bezirke-demographie', t => {
        return t.batch([
            t.one('select * from $1:raw_demographie where year = $2 and raum_id = $3', demIDArray)
        ]);
    })
    .then(data => {
        
        var ebene_demo = {
          id : req.params.id + '_' + data[0].year + data[0].raum_id,
          type : 'data/demographie',
          attributes : data[0]
        };
        
          
        res.status(200)
        .json({
          data: ebene_demo
        });
    })
    .catch(err => {
        return next(err);
    });
}