import Ember from 'ember';

export default Ember.Component.extend({
	lat : 52.517057,
    lng : 13.406067,
    zoom : 11,
    store: Ember.inject.service(),
    updateMe : false,
    init() {
		this._super(...arguments);

		this.get('model.ebene.ebene').forEach(function(raum) {
			
			raum.set('style',Ember.Object.create());
			raum.get('style').set('color','#3388ff')
			raum.set('value','');
			
		});
    },
	didReceiveAttrs() {
		this._super(...arguments);

		let year = this.get('model.ebene.ebeneState.year');
		let dataAttr = this.get('model.ebene.ebeneState.dataAttr');
		let store = this.get('store');
		let me = this;

		//console.log(dataAttr);
		//console.log(year);


		if (year != null & dataAttr != null) {


			this.get('model.ebene.ebene').forEach(function(raum) {	

				let max = me.get('model.dataKey.key_max.overall');
				

				var data = me.get('model.data');
				data.forEach(function(datum) {	
					if (datum.get('id') == year + raum.id)	{
						
						let value = datum.get(dataAttr);	
						
						raum.set('value',value);
						
						if (raum.get('style') == undefined) {
							raum.set('style',Ember.Object.create());
						}
						raum.get('style').set('color',me.generateColor(value / max));
					}
				});

				

				//let testColor = Math.random() > .5 ? 'red' : 'green';
				//raum.get('style').set('color',testColor);

				/*store.queryRecord('data/demographie', {path: me.get('model.ebene.ebene.query.path') + '/demographie/'+ year + raum.id}).then(function(record){
						let value = record.get(dataAttr);	

				});*/
				
		
			});


		}
		this.set('updateMe', !this.get('updateMe'));

		
	},
	generateColor(percent) {
		var start = 120, end = 0;
		  var a = percent,
		      b = (end - start) * a,
		      c = b + start;

		  // Return a CSS HSL string
		  return 'hsl('+parseInt(c)+', 100%, 50%)';
		
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
