import Ember from 'ember';

export default Ember.Route.extend({
	service : Ember.inject.service('ebene'),
	beforeModel(transition) {
		if (transition.intent.url === '/ebene/') {
			this.replaceWith('/ebene/bezirke');
		}
		
	},
	model(params) {
		return Ember.RSVP.hash({
	      ebene: this.store.query('ebene',{path : 'ebene/' + params.ebene_id}),
	      ebeneState : this.get('service').get('ebeneState')
	    });
	},
	actions: {
	    setRaum(raum) {
	    	this.get('service').setRaum(raum);
	        this.refresh();
	    },
	    setYear(year) {
	    	this.get('service').setYear(year);
	        this.refresh();
	    },
	    setDataAttr(dataAttr) {
	    	this.get('service').setDataAttr(dataAttr);
	        this.refresh();
	    },
	    setDataSet(dataSet) {
	    	this.get('service').setDataSet(dataSet);
	        this.refresh();
	    }
	}
});
