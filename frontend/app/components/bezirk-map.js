import Ember from 'ember';

export default Ember.Component.extend({
	store: Ember.inject.service(),
	lat : 52.517057,
    lng : 13.406067,
    zoom : 11,
    init() {
    	this._super(...arguments);
    	this.get('model.pModel.bezirke').forEach(function(bezirk) {
			
			bezirk.set('style',Ember.Object.create());
			bezirk.set('value',Ember.Object.create());
			
		});
    },
	didReceiveAttrs() {
		this._super(...arguments);

		let year = this.get('model.pModel.bezirkeState.year');
		let dataAttr = this.get('model.pModel.bezirkeState.dataAttr');
		let dem_records = this.get('model.dem_records');
		let store = this.get('store');
		let me = this;

		
		if (year != null & dataAttr != null) {
			this.get('model.pModel.bezirke').forEach(function(bezirk) {

				let testColor = Math.random() > .5 ? 'red' : 'green';
				
				

				store.find('bezirk/demographie',year + bezirk.id).then(function(record){
					let value = record.get(dataAttr);
					bezirk.set('value',value);
					bezirk.get('style').set('color',me.generateColor(value / 150000));
				});
				
		
			});
		}


		
	},
	generateColor(percent) {
		var start = 120, end = 0;
		  var a = percent,
		      b = (end - start) * a,
		      c = b + start;

		  // Return a CSS HSL string
		  return 'hsl('+c+', 100%, 50%)';
		
		//Change the start and end values to reflect the hue map
		//Refernece : http://www.ncl.ucar.edu/Applications/Images/colormap_6_3_lg.png

		/*
		Quick ref:
		    0 – red
		    60 – yellow
		    120 – green
		    180 – turquoise
		    240 – blue
		    300 – pink
		    360 – red
		*/      
	}
});
