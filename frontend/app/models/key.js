import DS from 'ember-data';

export default DS.Model.extend({
	key_map: DS.attr(),// string, number, boolean, and date
	key_min: DS.attr(),
	key_max: DS.attr()
});
