//var promise = require('bluebird');

var options = {
  // Initialization Options
  //promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = process.env.DATABASE_URL ||  'postgres://gentrimap_01:h46aYNjlvqd67G5y@localhost:5432/gentrimap_02';
var db = pgp(connectionString);


// add query functions

module.exports = {
  getEbenen : getEbenen,
  getEbene : getEbene,
  getAllEbeneDemographie: getAllEbeneDemographie,
  getSingleEbeneDemographie : getSingleEbeneDemographie,
  getDemographieKey : getDemographieKey,
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
            //id : req.params.id + '_' + datum.year + datum.raum_id, 
            id : datum.year + datum.raum_id, 
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

function getDemographieKey(req, res, next) {
  // req.params.id = e.g. bezirke
  db.task('get-key-demographie', t => {
      return t.batch([
          t.any('select attribute, name from key_demographie'),
          t.any('select MIN(e_e) as "overall", MIN(e_e) as "e_e", MIN(e_em) as "e_em", MIN(e_ew) as "e_ew", MIN(e_u1) as "e_u1", MIN(e_1u6) as "e_1u6", MIN(e_6u15) as "e_6u15", MIN(e_15u18) as "e_15u18", MIN(e_18u25) as "e_18u25", MIN(e_25u55) as "e_25u55", MIN(e_55u65) as "e_55u65", MIN(e_65u80) as "e_65u80", MIN(e_80u110) as "e_80u110" from $1:raw_demographie', req.params.id),
          t.any('select MAX(e_e) as "overall", MAX(e_e) as "e_e", MAX(e_em) as "e_em", MAX(e_ew) as "e_ew", MAX(e_u1) as "e_u1", MAX(e_1u6) as "e_1u6", MAX(e_6u15) as "e_6u15", MAX(e_15u18) as "e_15u18", MAX(e_18u25) as "e_18u25", MAX(e_25u55) as "e_25u55", MAX(e_55u65) as "e_55u65", MAX(e_65u80) as "e_65u80", MAX(e_80u110) as "e_80u110" from $1:raw_demographie', req.params.id),
      ]);
  })
  .then(data => {
    var mapObj = {};
    for( let datum of data[0]) {
      mapObj[datum.attribute]  = datum.name;
    }
    var demo_key = {
      id : 'demographie_key',
      type : 'key',
      attributes : {
        key_map : mapObj,
        key_min : data[1][0],
        key_max : data[2][0]
      }
    }

    res.status(200)
    .json({
      data: demo_key
    });
  })
  .catch(err =>{
    return next(err);
  })

}