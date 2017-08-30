import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		console.log('hello from route');
		return Ember.RSVP.hash({
	      ebene: this.modelFor('ebene'),
	      data : this.get('store').findAll('data/demographie')
	    });
	}
});
