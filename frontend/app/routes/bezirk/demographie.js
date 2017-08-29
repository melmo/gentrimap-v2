import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		return Ember.RSVP.hash({
	      pModel: this.modelFor('bezirk'),
	      dem_records : this.get('store').findAll('bezirk/demographie')
	    });
	}
});
