import Ember from 'ember';

export default Ember.Route.extend({
	service : Ember.inject.service('bezirk'),
	model() {		
		return Ember.RSVP.hash({
	      bezirke: this.get('store').findAll('bezirk'),
	      bezirkeState : this.get('service').get('bezirkeState')
	    });
	},
	actions: {
	    setBezirk(bezirk) {
	    	this.get('service').setBezirk(bezirk);
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
