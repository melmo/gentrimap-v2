import Ember from 'ember';
import Demographie from '../models/bezirk/demographie';

let attributes = Ember.get(Demographie, 'attributes');
let recordAttr = [];
attributes.forEach(function(meta, name) {
	if (name !== 'year' && name !== 'bezirk_id') {
		recordAttr.push(name);
	}
	
});

export default Ember.Component.extend({
	recordAttr : recordAttr
});


