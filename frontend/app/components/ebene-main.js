import Ember from 'ember';

export default Ember.Component.extend({
	didReceiveAttrs() {
		this._super(...arguments);

		this.get('model.ebene').forEach(function(raum) {
			
			raum.set('style',Ember.Object.create());
			raum.set('value',Ember.Object.create());
			
		});

		let year = this.get('model.ebeneState.year');
		let dataAttr = this.get('model.ebeneState.dataAttr');
		let store = this.get('store');
		let me = this;

		
		//if (year != null & dataAttr != null) {
			this.get('model.ebene').forEach(function(raum) {

				let testColor = Math.random() > .5 ? 'red' : 'green';
				raum.get('style').set('color',testColor);

				/*store.find('ebene/' + raum.type + '/demographie',year + raum.id).then(function(record){
					let value = record.get(dataAttr);
					raum.set('value',value);
					raum.get('style').set('color',me.generateColor(value / 150000));
				});*/
				
		
			});
		//}


		
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
