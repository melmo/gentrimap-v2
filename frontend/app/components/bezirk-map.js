import Ember from 'ember';

export default Ember.Component.extend({
	lat : 52.517057,
    lng : 13.406067,
    zoom : 11,
    actions : {
    	onClick(bezirk, e) {
    		var store = this.get('attr');
    		console.log(store);
	    }
    }
    
});
