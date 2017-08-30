import Ember from 'ember';

export default Ember.Component.extend({
	store: Ember.inject.service(),
	lat : 52.517057,
    lng : 13.406067,
    zoom : 11
    
});
