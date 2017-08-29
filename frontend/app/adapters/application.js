import DS from 'ember-data';
import Ember from 'ember';

var ApplicationAdapter = DS.JSONAPIAdapter.extend({
	namespace: 'api',
	host:'http://localhost:3000'
});

var inflector = Ember.Inflector.inflector;
inflector.irregular('bezirk', 'bezirke');
inflector.uncountable('demographie');

export default ApplicationAdapter;