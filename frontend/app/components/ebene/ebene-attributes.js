import Ember from 'ember';


export default Ember.Component.extend({
	recordAttr : [],
	init() {
		this._super(...arguments);
		let key_map = this.get('model.dataKey.key_map');
		let attributes = Ember.get(this.get('model.dataModel'), 'attributes');
		let recordAttr = [];
		attributes.forEach(function(meta, attr) {
			if (attr !== 'year' && attr !== 'raum_id') {
				recordAttr.push({
					value : attr,
					name : key_map[attr]
				});
			}
			
		});
		this.set('recordAttr', recordAttr);
	}
});


