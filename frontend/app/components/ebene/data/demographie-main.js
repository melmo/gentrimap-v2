import Ember from 'ember';

export default Ember.Component.extend({
	years : [],
	minYear : 0,
	maxYear : 9999,
	activeYear : 9999,
	didReceiveAttrs() {
	    this._super(...arguments);
	    // set min and max years for slider element
	    var minYear = 9999;
	    var maxYear = 0;
	    const dem_records = this.get('model.data').forEach(function(datum) {
	    	var year = datum.get('year');

	    	if (year > maxYear) {
	    		maxYear = year;
	    	}
	    	if (year < minYear) {
	    		minYear = year;
	    	}
	    	
	    });	    
	    this.set('minYear', minYear);
	    this.set('maxYear', maxYear);
	    if (this.get('model.ebene.ebeneState.year')) {
	    	this.set('activeYear', this.get('model.ebene.ebeneState.year'));
	    } else {
	    	this.set('activeYear', maxYear);
	    }
	    
	   
	  }
});
