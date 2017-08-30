import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr('string'),// string, number, boolean, and date
	geojson: DS.attr(),
	type: DS.attr('string')
});
