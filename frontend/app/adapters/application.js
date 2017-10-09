import DS from 'ember-data';
import Ember from 'ember';
import ENV from 'frontend/config/environment';

var ApplicationAdapter = DS.JSONAPIAdapter.extend({
	namespace: 'api',
	host:ENV.APIHOST,
	query(store, type, query) {

    return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.getJSON(`${ENV.APIHOST}/api/${query.path}`).then(function(data) {
        resolve(data);
      }, function(jqXHR) {
        reject(jqXHR);
      });
    });

   /* return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.getJSON(`http://localhost:3000/api/${type.modelName}/${query.id}`).then(function(data) {
        resolve(data);
      }, function(jqXHR) {
        reject(jqXHR);
      });
    });
*/
  },
 queryRecord(store, type, query) {

    return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.getJSON(`${ENV.APIHOST}/api/${query.path}`).then(function(data) {
        resolve(data);
      }, function(jqXHR) {
        reject(jqXHR);
      });
    });

  }
});

var inflector = Ember.Inflector.inflector;
inflector.irregular('bezirk', 'bezirke');
inflector.irregular('ebene', 'ebenen');
inflector.irregular('planungsraum', 'planungsraeume');
inflector.uncountable('demographie');

export default ApplicationAdapter;